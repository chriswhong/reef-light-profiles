import React from 'react'
import ProfileCard from './ProfileCard'

import { getUserProfiles } from './util/api'

const UserPage = (props) => {
  const { username } = props.match.params

  const [hasError, setErrors] = React.useState(false)
  const [profiles, setProfiles] = React.useState([])

  React.useEffect(() => {
    async function fetchData () {
      await getUserProfiles(username)
        .then(res => setProfiles(res))
        .catch(err => setErrors(err))
    }

    fetchData()
  }, [username])
  let profileCards = (
    <p>This user hasn't created any profiles yet</p>
  )

  if (profiles) {
    profileCards = profiles.map((profile, i) => (
      <div className="col-12 col-md-6 col-lg-4" key={i}>
        <ProfileCard profile={profile} showUser={false} interactive={false}/>
      </div>
    ))
  }

  if (hasError) {
    return (
      <div className='container content'>
        Oops, something went wrong
      </div>
    )
  }

  return (
    <>
      <div className='container my-5'>
        <h2>{username}'s light profiles</h2>
        <div className='row'>
          {profileCards}
        </div>

      </div>
    </>
  )
}

export default UserPage
