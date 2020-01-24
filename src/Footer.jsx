import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <footer className="">
          <div className="row">
            <div className="col-12 col-md">
              <small className="d-block text-muted"><FontAwesomeIcon icon={faFish}/> © 2020 Reef Light Profiles</small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Footer
