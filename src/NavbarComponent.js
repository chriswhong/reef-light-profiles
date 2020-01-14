import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = ({ user, isAuthenticated, loginWithRedirect, logout }) => {
  let userNav = null

  if (user) {
    userNav = (
      <>
      <NavDropdown title={user.nickname} id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={() => { logout() }}>Sign Out</NavDropdown.Item>
      </NavDropdown>
      </>
    )
  } else {
    userNav = (
      <>
        <Nav.Item>
          <Nav.Link href="/" onClick={() => {
            loginWithRedirect({
              redirect_uri: 'http://localhost:3000/authenticated'
            })
          }}>Sign In</Nav.Link>
        </Nav.Item>
      </>
    )
  }

  return (
    <Navbar className="navbar navbar-expand-lg">
      <Navbar.Brand href="#home"><FontAwesomeIcon icon={faFish} /> Reef Lighting Swap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='ml-auto'>
          {userNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
