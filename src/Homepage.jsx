import React from 'react'
import ProfileCard from './ProfileCard'
import Footer from './Footer'

const Homepage = ({ recentlyAdded }) => {
  let profileCards
  if (recentlyAdded) {
    profileCards = recentlyAdded.map((profile, i) => (
      <div className="col-4" key={i}>
        <ProfileCard profile={profile} interactive={false}/>
      </div>
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
            <img src='images/chart.png' alt='a visualization of a reef light profile'/>
          </div>
        </div>
      </div>
    </div>
    <div className='container recently-added'>
      <h4> Recently Added Profiles </h4>
      <div className='row'>
        {profileCards}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Homepage
