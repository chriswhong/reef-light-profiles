var express = require('express')
const jwt = require('jsonwebtoken')

const { jwtOptions } = require('../config')

var router = express.Router()

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
    const records = await Record.find({ user: req.user._id })

    res.json({
      user: req.user,
      records
    })
  })

  router.post('/api/record', passport.authenticate('jwt', { session: false }), (req, res) => {
    // create a dummy record
    const record = new Record({
      user: req.user._id,
      parameter: 'ph',
      value: 8.3,
      timestamp: new Date()
    })

    record.save((err) => {
      if (err) console.error(err)
      res.json({ success: true })
    })
  })

  router.get('/auth/facebook', passport.authenticate('facebook', {
    session: false,
    scope: ['email']
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
