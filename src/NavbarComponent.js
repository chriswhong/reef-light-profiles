import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish, faUser } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = ({ user, username, isAuthenticated, loginWithRedirect, logout }) => {
  let userNav = null

  if (user) {
    userNav = (
      <>
      <Nav.Item>
        <Link to='/dashboard' className='nav-link'>
          Dashboard
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={`/${username}`} className='nav-link'>

        </Link>
      </Nav.Item>
      <NavDropdown
        title={
          <>
            <FontAwesomeIcon icon={faUser}/> {username}
          </>
        }
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item onClick={() => {
          logout({
            redirect_uri: 'foo'
          })
        }}>Sign Out</NavDropdown.Item>
      </NavDropdown>
      </>
    )
  } else {
    userNav = (
      <>
        <Nav.Item>
          <Nav.Link href="/" onClick={() => {
            loginWithRedirect()
          }}>Sign In</Nav.Link>
        </Nav.Item>
      </>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/" className='nav-link'><FontAwesomeIcon icon={faFish} /> Reef Light Profiles</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='ml-auto'>
          {userNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
