import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { getUsername } from './util/api'

const Authenticate = ({ setUsername, getTokenSilently, loading, username }) => {
  const [noUsernameFound, setNoUsernameFound] = useState(false)

  useEffect(() => {
    // check if username exists
    async function didMount () {
      if (!loading) {
        const token = await getTokenSilently()
        await getUsername(token, username)
          .then((res) => {
            if (res.error) {
              setNoUsernameFound(true)
            }

            setUsername(res.username)
          })
      }
    }

    didMount()
  }, [setUsername, getTokenSilently, loading, username])

  if (noUsernameFound) {
    return <Redirect to="/create-username" />
  }

  if (username) {
    return <Redirect to="/dashboard" />
  }

  return (
    <>
      <h1>Authenticated</h1>
    </>
  )
}

export default Authenticate
