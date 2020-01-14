import React, { useState, useEffect } from 'react'
import {
  Link
} from 'react-router-dom'

const Dashboard = ({ username, loading, getTokenSilently }) => {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    // check if username exists
    async function getUsername () {
      if (!loading) {
        const token = await getTokenSilently()
        await fetch('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(d => d.json())
          .then((res) => {
            if (res.error) {
              setDashboardData(null)
            }

            setDashboardData(res)
          })
      }
    }

    getUsername()
  }, [loading, getTokenSilently])

  let profileItems = null

  if (dashboardData) {
    profileItems = dashboardData.map(({ _id, title }) => {
      return (
        <Link to={`/${username}/profile/${_id}`}>{ title }</Link>
      )
    })
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <h2>Your Dashboard {username}</h2>
          {profileItems}
          <br/>
          <Link to='/new'>Add a new profile</Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
