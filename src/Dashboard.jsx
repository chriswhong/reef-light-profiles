import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'

import ProfileCard from './ProfileCard'

const Dashboard = ({ username, profiles }) => {
  let profileCards = <p>No Profiles</p>

  if (profiles) {
    profileCards = profiles.map((profile, i) => (
      <ProfileCard key={i} profile={profile} interactive={false} />
    ))
  }

  return (
    <div className='container'>
      <h3>Dashboard for {username}</h3>
      <h5>Your Lighting Profiles</h5>
      <div className='d-flex justify-content-around'>
        {profileCards}
      </div>
      <Link to='/new'>
        <div className='btn btn-primary'>Add a new lighting profile</div>
      </Link>
      <Footer />
    </div>
  )
}

export default Dashboard
