const apiDomain = process.env.NODE_ENV === 'production' ? 'https://api.reeflightprofiles.com' : 'http://localhost:8080'

async function getUsername (token) {
  // pass jwt, get username and profiles
  return fetch(`${apiDomain}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(d => d.json())
}

async function putUsername (token, username) {
  return fetch(`${apiDomain}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ username })
  })
    .then(d => d.json())
}

async function getRecentlyAdded () {
  return fetch(`${apiDomain}/recently-added`)
    .then(d => d.json())
}

async function getProfile (_id) {
  return fetch(`${apiDomain}/profile/${_id}`)
    .then(d => d.json())
}

async function postProfile (token, profile) {
  return fetch(`${apiDomain}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(profile)
  })
    .then(d => d.json())
}

async function getUserProfiles (username) {
  return fetch(`${apiDomain}/user/profiles/${username}`)
    .then(d => d.json())
}

export {
  getUsername,
  putUsername,
  getRecentlyAdded,
  getProfile,
  postProfile,
  getUserProfiles
}
