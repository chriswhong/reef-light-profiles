var express = require('express')
const jwt = require('jsonwebtoken')

const { jwtOptions } = require('../config')

var router = express.Router()

module.exports = (passport) => {
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

  router.get('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user)
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
