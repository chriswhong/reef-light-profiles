import React from 'react'
import { Link } from 'react-router-dom'
import ProfileCard from './ProfileCard'

const Homepage = ({ recentlyAdded }) => {
  let profileCards
  if (recentlyAdded) {
    profileCards = recentlyAdded.map((profile, i) => (
      <ProfileCard key={i} profile={profile}/>
    ))
  }

  return (
    <>
    <div className='hero-container'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-6 hero'>
            <h1>Reef Light Profiles</h1>
            <p>A place to find and share light programs for your reef aquarium.</p>
            <div className='btn btn-primary'>Sign Up</div>
          </div>
          <div className='col-12 col-md-6 hero-image '>
            <img src='images/chart.png'/>
          </div>
        </div>
      </div>
    </div>
    <div className='container recently-added'>
      <div className='row'>
        <div className='col-9'>
          <h4> Recently Added Profiles </h4>
          {profileCards}
        </div>
      </div>
    </div>
    </>
  )
}

export default Homepage
