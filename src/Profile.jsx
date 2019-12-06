import React from 'react'
import convert from 'xml-js'
import Chart from './Chart.jsx'
import Dropzone from './Dropzone'

import dummyJson from './dummy.json'

const NewProfile = (props) => {
  const { _id } = props.match.params

  const [hasError, setErrors] = React.useState(false)
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    async function fetchData () {
      const res = await fetch(`/api/profile/${_id}/`)
      res.json()
        .then(res => setProfile(res))
        .catch(err => setErrors(err))
    }

    fetchData()
  }, [])
  console.log('profile', profile)
  const { settings } = profile

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <h2>Light Profile</h2>
          <p>Enter a title and description, then drag in your .aip file below.</p>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            <label htmlFor='exampleFormControlTextarea1'>Light Settings</label>
            {settings && <Chart filename='foo' data={settings}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProfile