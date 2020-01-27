import React from 'react'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock, faEdit, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap'

import ProfileChart from './ProfileChart.jsx'

import { apiDomain, getProfile, deleteProfile } from './util/api'

const Profile = (props) => {
  const { _id, username, getTokenSilently } = props

  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleDeleteProfile = async () => {
    const token = await getTokenSilently()
    await deleteProfile(token, _id)
      .then(() => {
        props.history.push('/dashboard')
      })
  }

  const [hasError, setErrors] = React.useState(false)
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    async function fetchData () {
      await getProfile(_id)
        .then(res => setProfile(res))
        .catch(err => setErrors(err))
    }

    fetchData()
  }, [_id])

  const { title, description, settings } = profile

  if (hasError) {
    return (
      <div className='container content'>
        Oops, something went wrong
      </div>
    )
  }

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-6'>
          <div className='title-block'>
            <h3>{title}</h3>
            <Link to={`/${profile.username}`}>
              <FontAwesomeIcon icon={faUser}/> {profile.username}
            </Link>
            &nbsp;
            &nbsp;
            &nbsp;
            <FontAwesomeIcon icon={faClock}/> {moment(profile.updatedAt).fromNow()}
          </div>
        </div>
        <div className='col-6 text-right'>
          { username === profile.username && (
            <>
              <Link to={`/${profile.username}/profile/${_id}/edit`}>
                <div className='btn btn-primary btn-sm'>
                  <FontAwesomeIcon icon={faEdit}/> Edit
                </div>
              </Link>
              &nbsp;
              <div className='btn btn-primary btn-sm btn-danger' onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash}/> Delete
              </div>
            </>
          )}
        </div>
        <div className='col-12 col-md-4'>
          <div className='content-block'>
            <h6> Description </h6>
            { description }
          </div>
          <div className='content-block'>
            <h6> Download </h6>
            <a href={`${apiDomain}/profile/${_id}/download`}><div className='btn btn-primary btn-lg w-100'><FontAwesomeIcon icon={faDownload}/> .aip</div></a>
          </div>
        </div>
        <div className='col-12 col-md-8'>
          <h6>Preview</h6>
          {settings && <ProfileChart filename='foo' data={settings}/>}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <strong>Are you sure you want to delete {title}?</strong><br/>
          This action is not reversible
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default withRouter(Profile)
