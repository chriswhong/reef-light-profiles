var express = require('express')
const jwt = require('jsonwebtoken')

const { jwtOptions } = require('../config')

var router = express.Router()

const getRecords = (type, response) => {
  const match = response.find(d => d._id === type)
  return match ? match.records : []
}

module.exports = (passport, User, Profile) => {
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

  router.put('/api/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { _id } = req.user
    const { username } = req.body

    // check if unique, if not return error

    const match = await User.findOne({ username })
    if (match) {
      res.status(422)
      res.send({
        error: 'That username is already taken.  Please try again'
      })
      return
    }

    // update the current user
    const user = await User.findOneAndUpdate(
      { _id },
      { username },
      { new: true }
    )

    console.log(user)

    res.json({
      user
    })
  })

  router.get('/api/profile/:_id', async (req, res) => {
    const { _id } = req.params

    const profile = await Profile.findOne({ _id })
    res.json(profile)
  })

  router.post('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
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
