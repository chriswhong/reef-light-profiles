import React, { useState, useEffect } from 'react'
import {
  Link
} from 'react-router-dom'
import ProfileChart from './ProfileChart'

const ProfileCard = ({ profile }) => {
  return (
    <div className='card profile-card' style={{ width: '18rem' }}>
      <div className='card-img-top'>
        <ProfileChart data={profile.settings} />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{profile.title}</h5>
        <p className='card-text'>{profile.description}</p>
        <a href='#' className='btn btn-primary'>Go somewhere</a>
      </div>
    </div>
  )
}

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
