var express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const authConfig = require('./auth_config.json')

const { jwtOptions } = require('../config')

var router = express.Router()

const getRecords = (type, response) => {
  const match = response.find(d => d._id === type)
  return match ? match.records : []
}

var checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://reef-profiles.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://localhost:3000',
  issuer: 'https://reef-profiles.auth0.com/',
  algorithms: ['RS256']
})

module.exports = (User, Profile) => {
  // Generate an Access Token for the given User ID
  const generateAccessToken = (userId) => {
    const { expiresIn, issuer, audience, secret } = jwtOptions

    return jwt.sign({}, secret, {
      expiresIn,
      audience,
      issuer,
      subject: userId.toString()
    })
  }

  router.get('/api/user', checkJwt, async (req, res) => {
    // // get records for this user
    // const dbResponse = await Record
    //   .aggregate([
    //     {
    //       $match: {
    //         user: req.user._id
    //       }
    //     },
    //     { $sort: { date: -1 } },
    //     {
    //       $group: {
    //         _id: '$type',
    //         records: {
    //           $push: {
    //             date: '$date',
    //             value: '$value'
    //           }
    //         }
    //       }
    //     }
    //   ])

    res.json({
      user: req.user
    })
  })

  router.put('/api/user', checkJwt, async (req, res) => {
    console.log('user', req.user)
    const { sub } = req.user
    const { username } = req.body

    console.log('user', User)

    const match = await User.findOne({ username })
    if (match) {
      res.status(422)
      res.send({
        error: 'That username is already taken.  Please try again'
      })
      return
    }

    // update the current user
    console.log('updating', sub, username)
    const user = await User.findOneAndUpdate(
      { sub },
      { username },
      { new: true, upsert: true }
    )

    console.log('new user', user)

    res.json({
      user
    })
  })

  router.get('/api/profile/:_id', async (req, res) => {
    const { _id } = req.params

    const profile = await Profile.findOne({ _id })
    res.json(profile)
  })

  router.post('/api/profile', checkJwt, (req, res) => {
    const { title, description, settings } = req.body
    // create a dummy record
    const record = new Profile({
      user: req.user._id,
      title,
      description,
      settings
    })

    record.save((err, { _id }) => {
      if (err) console.error(err)
      res.json({
        success: true,
        _id
      })
    })
  })

  return router
}
