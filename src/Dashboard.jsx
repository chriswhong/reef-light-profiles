import React, { useState, useEffect } from 'react'
import {
  Link
} from 'react-router-dom'

import ProfileCard from './ProfileCard'

const Dashboard = ({ username, profiles }) => {
  let profileCards = <p>No Profiles</p>

  if (profiles) {
    profileCards = profiles.map((profile, i) => (
      <ProfileCard key={i} profile={profile}/>
    ))
  }

  return (
    <div className='container'>
      <h3>Dashboard for {username}</h3>
      <h5>Your Lighting Profiles</h5>
      <div className='d-flex justify-content-around'>
        {profileCards}
      </div>
      <Link to='/new'>Add a new lighting profile</Link>
    </div>
  )
}

export default Dashboard
