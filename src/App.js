import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './App.css'
import OAuth from './OAuth'

const NavbarComponent = (props) => {
  const user = props.user
  let userNav = null

  if (user) {
    const userTitle = (
      <>
        <img height={22} width={22} src={user.photo} alt='user photos' />
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
  }

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
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
  }

  async getUserInfo () {
    // if jwt cookie, do get user data
    if (Cookies.get('jwt')) {
      const userData = await fetch('/api/user').then(d => {
        if (d.status !== 401) return d.json()
      })

      if (userData) {
        this.setState({
          user: userData
        })
      }
    }
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
        <NavbarComponent user={this.state.user} onSignout={this.signout} />
        <div className="container">
          {
            !user && (
              <OAuth
                provider={'facebook'}
              />
            )
          }

        </div>
      </div>
    )
  }
}
