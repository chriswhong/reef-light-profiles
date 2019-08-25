import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Navbar from 'react-bootstrap/Navbar'
import Charts from './Charts'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

import OAuth from './OAuth'

const NavbarComponent = (props) => {
  const user = props.user
  let userNav = null

  if (user) {
    const userTitle = (
      <>
        <img className='user-photo' src={user.photo} alt='user photos' />
        {user.name}
      </>
    )

    userNav = (
      <>
      <NavDropdown title={userTitle} id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={() => { props.onSignout() }}>Sign Out</NavDropdown.Item>
      </NavDropdown>
      </>
    )
  } else {
    userNav = (
      <>
      <NavDropdown
        alignRight
        title={'Sign In'}
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item onClick={props.onSigninFacebook}>
          <FontAwesomeIcon
            icon={faFacebookSquare}
            size='lg'
          />
        &nbsp;Sign in with Facebook
        </NavDropdown.Item>
      </NavDropdown>
      </>
    )
  }

  return (
    <Navbar className="navbar navbar-expand-lg">
      <Navbar.Brand href="#home">Reef Log</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='ml-auto'>
          {userNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null
    }

    this.signout = this.signout.bind(this)
    this.signinFacebook = this.signinFacebook.bind(this)
  }

  async getUserInfo () {
    // if jwt cookie, do get user data
    if (Cookies.get('jwt')) {
      const { user, records } = await fetch('/api/user').then(d => {
        if (d.status !== 401) return d.json()
      })

      if (user) {
        this.setState({ user, records })
      }
    }
  }

  signinFacebook () {
    const width = 600; const height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = 'http://localhost:8080/auth/facebook'

    return window.open(url, '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no,
        scrollbars=no, resizable=no, copyhistory=no, width=${width},
        height=${height}, top=${top}, left=${left}`
    )
  }

  signout () {
    Cookies.remove('jwt')
    this.setState({
      user: null
    })
  }

  async componentDidMount () {
    this.getUserInfo()
  }

  render () {
    const { user } = this.state
    return (
      <div className="App">
        <NavbarComponent
          user={this.state.user}
          onSigninFacebook={this.signinFacebook}
          onSignout={this.signout}
        />
        <div className="content">
          <Charts />
        </div>
      </div>
    )
  }
}
