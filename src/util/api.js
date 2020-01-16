
async function fetchUsername (token) {
  // pass jwt, get username and profiles
  return fetch('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(d => d.json())
}

async function fetchRecentlyAdded () {
  return fetch('/api/recently-added')
    .then(d => d.json())
}

export {
  fetchUsername,
  fetchRecentlyAdded
}
