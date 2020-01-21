import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons'

import BuildAIP from './util/build-aip'
import ProfileChart from './ProfileChart.jsx'

import { getProfile } from './util/api'

const Profile = (props) => {
  const { _id } = props.match.params

  const [hasError, setErrors] = React.useState(false)
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    async function fetchData () {
      const res = await getProfile(_id)
        .then(res => setProfile(res))
        .catch(err => setErrors(err))
    }

    fetchData()
  }, [_id])

  const { title, description, settings } = profile

  const downloadProfile = () => {
    const aip = BuildAIP(settings)

    var pom = document.createElement('a')
    var filename = 'settings.aip'
    var bb = new Blob([aip], { type: 'text/plain' })

    pom.setAttribute('href', window.URL.createObjectURL(bb))
    pom.setAttribute('download', filename)

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':')
    pom.draggable = true
    pom.classList.add('dragout')

    pom.click()
  }

  return (
    <div className='container content'>
      <div className='row'>
        <div className='col-4'>
          <div className='title-block'>
            <h2>{title}</h2>
            <FontAwesomeIcon icon={faUser}/> {profile.username}
            &nbsp;
            &nbsp;
            &nbsp;
            <FontAwesomeIcon icon={faClock}/> {moment(profile.updatedAt).fromNow()}
          </div>
          <div className='content-block'>
            <h5> Description </h5>
            { description }
          </div>
          <div className='content-block'>
            <div className='btn btn-primary' onClick={downloadProfile}>Download .aip</div>
          </div>
        </div>
        <div className='col-8'>
          <h4>Preview</h4>
          {settings && <ProfileChart filename='foo' data={settings}/>}
        </div>
      </div>
    </div>
  )
}

export default Profile
