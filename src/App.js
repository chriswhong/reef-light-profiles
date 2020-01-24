import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
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

import { getUsername, getRecentlyAdded } from './util/api'

const App = (props) => {
  const auth0 = useAuth0()
  const { user, loginWithRedirect, logout, getTokenSilently, loading } = auth0

  const [store, setStore] = useState({})

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
  }, [user, getTokenSilently, store])

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

  const setUsername = (username) => {
    setStore({
      ...store,
      username
    })
  }

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
              <NewProfile username={store.username} getTokenSilently={getTokenSilently} />
            </Route>
            <Route
              path="/authenticate"
              render={() => <Authenticate
                getTokenSilently={getTokenSilently}
                setUsername={setUsername}
                loading={loading}
                username={store.username}
              />}
            />
            <Route path="/dashboard">
              <Dashboard user={user} username={store.username} profiles={store.profiles}/>
            </Route>
            <Route path="/create-username">
              <CreateUsername getTokenSilently={getTokenSilently} updateUsername={setUsername}/>
            </Route>
            <Route path="/:username/profile/:_id/edit" render={(props) => (
              <NewProfile _id={props.match.params._id} username={store.username} getTokenSilently={getTokenSilently} editmode />
            )} />
            <Route path="/:username/profile/:_id" render={(props) => (
              <Profile _id={props.match.params._id} username={store.username} />
            )} />
            <Route path="/:username" component={UserPage}/>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
