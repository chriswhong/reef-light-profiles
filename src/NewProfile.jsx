import React from 'react'
import { withRouter, useParams } from 'react-router-dom'
import convert from 'xml-js'

import ProfileChart from './ProfileChart.jsx'
import Dropzone from './Dropzone'
import { getProfile, postProfile, putProfile } from './util/api'

const NewProfile = (props) => {
  const { getTokenSilently, username, editmode = false } = props
  const { _id } = useParams()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [settings, setSettings] = React.useState(null)

  const [error, setError] = React.useState(null)

  const handleParsedFile = (xml, filename) => {
    const json = convert.xml2js(xml, { compact: true })
    setSettings(json)
  }

  const resetSettings = () => {
    setSettings(null)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'title') setTitle(value)
    if (id === 'description') setDescription(value)
  }

  const handleSave = async () => {
    const data = {
      title,
      description,
      settings
    }
    const token = await getTokenSilently()

    if (editmode) {
      await putProfile(token, _id, data)
      props.history.push(`/${username}/profile/${_id}`)
    } else {
      const { _id } = await postProfile(token, data)
      props.history.push(`/${username}/profile/${_id}`)
    }
  }

  const valid = title && description && settings

  React.useEffect(() => {
    async function fetchData () {
      await getProfile(_id)
        .then(res => {
          const { title, description, settings } = res
          setTitle(title)
          setDescription(description)
          setSettings(settings)
        })
        .catch(err => setError(err))
    }

    // only fetch if we are in edit mode
    if (editmode) {
      fetchData()
    }
  }, [])

  if (error) {
    return (
      <div className='container content'>
        Oops, something went wrong
      </div>
    )
  }

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-8'>
          <h2>{ editmode ? 'Edit' : 'New'} Light Profile</h2>
          <p>Enter a title and description, then drag in your .aip file below.</p>
          <div className='form-group'>
            <h6>Title</h6>
            <input type='text' className='form-control' id='title' placeholder='Enter a title for this profile' value={title} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <h6 for='description'>Description</h6>
            <textarea className='form-control' id='description' rows='3' value={description} onChange={handleChange}></textarea>
          </div>
        </div>
        <div className='col-4'>
          <button type="button" className="publish-btn btn btn-primary btn-lg" onClick={handleSave} disabled={!valid}>{ editmode ? 'Save' : 'Publish'} Profile</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            <h6 for='exampleFormControlTextarea1'>Light Settings {settings && <span className='small link-like' onClick={resetSettings}>clear</span>}</h6>
            {
              settings
                ? <ProfileChart filename='foo' data={settings}/>
                : <Dropzone onFileParse={(xml, filename) => handleParsedFile(xml, filename)} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NewProfile)
