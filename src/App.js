import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Homepage from './Homepage'
import Authenticate from './Authenticate'
import Profile from './Profile'
import NewProfile from './NewProfile'
import Dashboard from './Dashboard'
import UserPage from './UserPage'
import CreateUsername from './CreateUsername'
import NavbarComponent from './NavbarComponent'
import { useAuth0 } from './react-auth0-spa'

import { getUsername, getRecentlyAdded, postProfile } from './util/api'

const App = (props) => {
  const auth0 = useAuth0()
  const { loading, user, loginWithRedirect, logout, getTokenSilently } = auth0

  const [store, setStore] = useState({})

  const handleSaveProfile = async (profile) => {
    const token = await getTokenSilently()
    return postProfile(token, profile)
  }

  useEffect(() => {
    // once user exists, if there is no username, go get it
    if (user) {
      if (!store.username) {
        const didMount = async () => {
          const token = await getTokenSilently()
          getUsername(token)
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

        didMount()
      }
    }
  }, [user])

  // get recently added
  useEffect(() => {
    if (!store.recentlyAdded) {
      getRecentlyAdded()
        .then((res) => {
          if (res.error) {
            // setNoUsernameFound(true)
          }
          const profiles = res
          setStore({
            ...store,
            recentlyAdded: profiles
          })
        })
    }
  })

  return (
    <div className="App">
      <Router>
        <NavbarComponent user={user} username={store.username} loginWithRedirect={loginWithRedirect} logout={logout} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Homepage recentlyAdded={store.recentlyAdded} />
            </Route>
            <Route path="/new" >
              <NewProfile username={store.username} onSaveProfile={handleSaveProfile}/>
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
            <Route path="/:username/profile/:_id" component={Profile} />
            <Route path="/:username" component={UserPage}/>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
