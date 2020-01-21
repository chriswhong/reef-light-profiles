import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from './react-auth0-spa'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import config from './auth_config.json'

const apiDomain = process.env.NODE_ENV === 'production' ? 'https://api.reefprofiles.com' : 'http://localhost:3000'

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={`${apiDomain}/dashboard`}
    audience={config.audience}
  >
    <App />
  </Auth0Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
