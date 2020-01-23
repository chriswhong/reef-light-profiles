import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className='container'>
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <FontAwesomeIcon icon={faFish}/>
            <small className="d-block mb-3 text-muted">© 2020 Reef Light Profiles</small>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
