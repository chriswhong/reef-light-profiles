import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Authenticated from './Authenticated'
import Profile from './Profile'
import NewProfile from './NewProfile'
import Dashboard from './Dashboard'
import CreateUsername from './CreateUsername'
import NavbarComponent from './NavbarComponent'
import { useAuth0 } from './react-auth0-spa'

const App = () => {
  const auth0 = useAuth0()
  const { loading, user, loginWithRedirect, logout, getTokenSilently } = auth0

  const [username, setUsername] = useState('')

  return (
    <div className="App">
      <NavbarComponent user={user} loginWithRedirect={loginWithRedirect} logout={logout} />
      <div className="content">
        <Router>
          {
            user && !username && (<Redirect to="/authenticated" />)
          }
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
            <Route path="/new">
              <NewProfile user={user} username={username} getTokenSilently={getTokenSilently}/>
            </Route>
            <Route
              path="/authenticated"
              render={() => <Authenticated
                setUsername={setUsername}
                getTokenSilently={getTokenSilently}
                loading={loading}
                username={username}
              />}
            />
            <Route path="/:username/profile/:_id" component={Profile}/>
            <Route path="/create-username">
              <CreateUsername getTokenSilently={getTokenSilently} setUsername={setUsername}/>
            </Route>
            <Route path="/dashboard">
              <Dashboard getTokenSilently={getTokenSilently} loading={loading} username={username}/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App
