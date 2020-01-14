import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from './react-auth0-spa'
import config from './auth_config.json'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
    >
      <App />
    </Auth0Provider>, div)
  ReactDOM.unmountComponentAtNode(div)
})
