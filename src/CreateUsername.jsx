import React from 'react'
import { withRouter } from 'react-router-dom'

const CreateUsername = (props) => {
  const { getTokenSilently, setUsername: updateUsername } = props
  const [username, setUsername] = React.useState('')
  const [error, setError] = React.useState('')

  const submitUsername = async () => {
    const token = await getTokenSilently()

    await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ username })
    })
      .then(d => d.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        }

        // update the user
        res.user && props.updateUsername(res.user)
        // navigate to user page
        props.history.push('/')
      })
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  return (
    <div className='container'>
      <div className="col-12 col-md-6 offset-md-3">
        <p>Please create a username before continuing</p>
        <div className='form-group'>
          <label forhtml='username'>Username</label>
          <input type='text' className='form-control' value={username} id='username' aria-describedby='usernameError' placeholder="Enter a username" onChange={handleChange}/>
          {error && <small id="usernameError" class="form-text text-muted text-danger">{error}</small>}
        </div>
        <button type="submit" className="btn btn-primary" onClick={submitUsername}>Submit</button>
      </div>
    </div>
  )
}

export default withRouter(CreateUsername)
