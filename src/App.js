import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Authenticate from './Authenticate'
import Profile from './Profile'
import NewProfile from './NewProfile'
import Dashboard from './Dashboard'
import UserPage from './UserPage'
import CreateUsername from './CreateUsername'
import NavbarComponent from './NavbarComponent'
import { useAuth0 } from './react-auth0-spa'

import { fetchUsername } from './util/api'

const App = (props) => {
  const auth0 = useAuth0()
  const { loading, user, loginWithRedirect, logout, getTokenSilently } = auth0

  const [store, setStore] = useState({})

  const saveProfile = async (profile) => {
    const token = await getTokenSilently()
    return fetch('http://localhost:3000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile) // body data type must match "Content-Type" header
    })
      .then(d => d.json())
  }

  useEffect(() => {
    // once user exists, if there is no username, go get it
    if (user) {
      if (!store.username) {
        const getUsername = async () => {
          const token = await getTokenSilently()
          fetchUsername(token)
            .then((res) => {
              if (res.error) {
                // setNoUsernameFound(true)
              }
              const { username, profiles } = res
              setStore({
                ...store,
                username,
                profiles
              })
            })
        }

        getUsername()
      }
    }
  }, [user])

  return (
    <div className="App">
      <Router>
        <NavbarComponent user={user} username={store.username} loginWithRedirect={loginWithRedirect} logout={logout} />
        <div className="content">
          <Switch>
            <Route exact path="/">
                <>
                  { user && (
                  <>
                    <p>You are logged in as {user.name}</p>
                    <h3>Light Profiles</h3>
                    <Link to='/new'>Add a new profile</Link>
                  </>
                  )}
                </>
            </Route>
            <Route path="/new" >
              <NewProfile username={store.username} saveProfile={saveProfile}/>
            </Route>
            <Route
              path="/authenticate"
              render={() => <Authenticate />}
            />
            <Route path="/dashboard">
              <Dashboard user={user} username={store.username} profiles={store.profiles}/>
            </Route>
            <Route path="/create-username">
              <CreateUsername />
            </Route>
            <Route path="/:username" component={UserPage}/>
            <Route path="/:username/profile/:_id" component={Profile}/>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
