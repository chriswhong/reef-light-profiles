import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock, faEdit } from '@fortawesome/free-solid-svg-icons'

import Footer from './Footer'
import BuildAIP from './util/build-aip'
import ProfileChart from './ProfileChart.jsx'

import { getProfile } from './util/api'

const Profile = (props) => {
  const { _id, username } = props

  const [hasError, setErrors] = React.useState(false)
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    async function fetchData () {
      await getProfile(_id)
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

  if (hasError) {
    return (
      <div className='container content'>
        Oops, something went wrong
      </div>
    )
  }

  return (
    <div className='container content'>
      <div className='row'>
        <div className='col-4'>
          <div className='title-block'>
            <h2>{title}</h2>
            <Link to={`/${profile.username}`}>
              <FontAwesomeIcon icon={faUser}/> {profile.username}
            </Link>
            &nbsp;
            &nbsp;
            &nbsp;
            <FontAwesomeIcon icon={faClock}/> {moment(profile.updatedAt).fromNow()}
          </div>
          <div className='content-block'>
            <h5> Description </h5>
            { description }
          </div>
          { username === profile.username && (
            <div className='content-block'>
              <Link to={`/${profile.username}/profile/${_id}/edit`}>
                <div className='btn btn-primary'>
                  <FontAwesomeIcon icon={faEdit}/> Edit Profile
                </div>
              </Link>
            </div>
          )}
          <div className='content-block'>
            <div className='btn btn-primary' onClick={downloadProfile}>Download .aip</div>
          </div>
        </div>
        <div className='col-8'>
          <h4>Preview</h4>
          {settings && <ProfileChart filename='foo' data={settings}/>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
