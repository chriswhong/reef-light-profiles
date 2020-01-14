import React from 'react'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Profile from './Profile'
import NewProfile from './NewProfile'
import CreateUsername from './CreateUsername'
import NavbarComponent from './NavbarComponent'
import { useAuth0 } from './react-auth0-spa'
console.log(useAuth0)

const App = () => {
  const auth0 = useAuth0()
  const { loading, user, loginWithRedirect, logout, getTokenSilently } = auth0

  console.log('loading', loading)
  console.log('user', user)

  return (
    <div className="App">
      <NavbarComponent user={user} loginWithRedirect={loginWithRedirect} logout={logout} />
      <div className="content">
        <Router>
          {
            user && (user.username === undefined) && (<Redirect to="/create-username" />)
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
              <NewProfile user={user}/>
            </Route>
            <Route path="/:username/profile/:_id" component={Profile}/>
            <Route path="/create-username">
              <CreateUsername getTokenSilently={getTokenSilently}/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App
