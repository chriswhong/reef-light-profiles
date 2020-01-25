import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ProfileCard from './ProfileCard'

const Dashboard = ({ username, profiles }) => {
  let profileCards = <p>No Profiles</p>

  if (profiles) {
    profileCards = profiles.map((profile, i) => (
      <div className="col-12 col-md-6 col-lg-4" key={i}>
        <ProfileCard profile={profile} showUser={false} interactive={false} />
      </div>
    ))
  }

  return (
    <div className='container my-5'>
      <h5 className='my-4'>Your Light Profiles</h5>
      <div className='d-flex justify-content-around'>
        {profileCards}
      </div>
      <div className='text-center my-5'>
        <Link to='/new'>
          <div className='btn btn-primary'><FontAwesomeIcon icon={faPlus}/> New Profile</div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
