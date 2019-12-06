import React from 'react'
import { withRouter } from 'react-router-dom'
import convert from 'xml-js'
import Chart from './Chart.jsx'
import Dropzone from './Dropzone'

import dummyJson from './dummy.json'

const NewProfile = (props) => {
  const { user } = props
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [settings, setSettings] = React.useState(null)

  const handleParsedFile = (xml, filename) => {
    const json = convert.xml2js(xml, { compact: true })
    setSettings(json)
  }

  const resetSettings = () => {
    setSettings(null)
  }

  const handleChange = (e) => {
    console.log('handleChange')
    const { id, value } = e.target
    if (id === 'title') setTitle(value)
    if (id === 'description') setDescription(value)
  }

  const publishProfile = async () => {
    const data = {
      title,
      description,
      settings
    }
    const { _id } = await fetch('http://localhost:8080/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(d => d.json())

    props.history.push(`/${user.username}/profile/${_id}`)
  }

  const valid = title && description && settings

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <h2>New Light Profile</h2>
          <p>Enter a title and description, then drag in your .aip file below.</p>
          <div className='form-group'>
            <label for='title'>Title</label>
            <input type='text' className='form-control' id='title' placeholder='Enter a title for this profile' value={title} onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label for='description'>Description</label>
            <textarea className='form-control' id='description' rows='3' value={description} onChange={handleChange}></textarea>
          </div>
        </div>
        <div className='col-4'>
          <button type="button" className="publish-btn btn btn-primary btn-lg" onClick={publishProfile} disabled={!valid}>Publish Profile</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            <label for='exampleFormControlTextarea1'>Light Settings {settings && <span className='small link-like' onClick={resetSettings}>reset</span>}</label>
            {
              settings
                ? <Chart filename='foo' data={settings}/>
                : <Dropzone onFileParse={(xml, filename) => handleParsedFile(xml, filename)} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NewProfile)
