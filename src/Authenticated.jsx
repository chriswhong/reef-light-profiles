import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Authenticated = ({ setUsername, getTokenSilently, loading, username }) => {
  const [noUsernameFound, setNoUsernameFound] = useState(false)

  useEffect(() => {
    // check if username exists
    async function getUsername () {
      if (!loading) {
        const token = await getTokenSilently()
        await fetch('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(d => d.json())
          .then((res) => {
            if (res.error) {
              setNoUsernameFound(true)
            }

            setUsername(res.username)
          })
      }
    }

    getUsername()
  }, [loading, getTokenSilently])

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

export default Authenticated
