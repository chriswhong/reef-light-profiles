var express = require('express')
const jwt = require('jsonwebtoken')

const { jwtOptions } = require('../config')

var router = express.Router()

const getRecords = (type, response) => {
  const match = response.find(d => d._id === type)
  return match ? match.records : []
}

module.exports = (passport, User, Record) => {
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

  router.get('/api/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // get records for this user
    const dbResponse = await Record
      .aggregate([
        {
          $match: {
            user: req.user._id
          }
        },
        { $sort: { date: -1 } },
        {
          $group: {
            _id: '$type',
            records: {
              $push: {
                date: '$date',
                value: '$value'
              }
            }
          }
        }
      ])

    res.json({
      user: req.user,
      records: {
        ph: getRecords('ph', dbResponse),
        alkalinity: getRecords('alkalinity', dbResponse),
        nitrate: getRecords('nitrate', dbResponse)
      }
    })
  })

  router.post('/api/record', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { type, date, value } = req.body
    // create a dummy record
    const record = new Record({
      user: req.user._id,
      type,
      date,
      value
    })

    record.save((err) => {
      if (err) console.error(err)
      res.json({ success: true })
    })
  })

  router.get('/auth/facebook', passport.authenticate('facebook', {
    session: false,
    scope: ['email'],
    display: 'popup'
  }))

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    (req, res) => {
      const accessToken = generateAccessToken(req.user.id)
      res.cookie('jwt', accessToken)
      res.render('authenticated')
    }
  )

  return router
}
