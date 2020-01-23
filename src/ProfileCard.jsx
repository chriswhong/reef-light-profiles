import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons'

import ProfileChart from './ProfileChart'

const ProfileCard = ({ profile, interactive = true }) => {
  return (
    <div className='card profile-card' style={{ width: '18rem' }}>
      <div className='card-img-top'>
        <ProfileChart data={profile.settings} interactive={interactive} />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{profile.title}</h5>
        <p className='card-text'>
          <FontAwesomeIcon icon={faUser}/> {profile.username}
          &nbsp;
          <FontAwesomeIcon icon={faClock}/> {moment(profile.updatedAt).fromNow()}
        </p>
        <Link to={`/${profile.username}/profile/${profile._id}`} className='btn btn-secondary'>View Profile</Link>
      </div>
    </div>
  )
}

export default ProfileCard
