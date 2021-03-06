const express = require('express')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const BuildAIP = require('../util/build-aip')

var router = express.Router()

var checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://reef-profiles.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.reeflightprofiles.com',
  issuer: 'https://reef-profiles.auth0.com/',
  algorithms: ['RS256']
})

module.exports = (User, Profile) => {
  // get user's list of profiles
  router.get('/dashboard', checkJwt, async (req, res) => {
    // find the user
    const { sub } = req.user
    const user = await User.findOne({ sub })

    // find all matching profiles
    const profiles = await Profile.find({ user: user._id })
    if (profiles) {
      res.json(profiles)
    }

    res.status(422)
    res.json({
      error: `no profiles found for user ${sub}`
    })
  })

  // get 10 recent profiles
  router.get('/recently-added', async (req, res) => {
    const profiles = await Profile.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'username'
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          settings: 1,
          updatedAt: 1,
          username: {
            $arrayElemAt: ['$username.username', 0]
          }
        }
      }
    ]).limit(10)
    if (profiles) {
      res.json(profiles)
      return
    }

    res.status(422)
    res.json({
      error: 'no profiles found'
    })
  })

  router.get('/user', checkJwt, async (req, res) => {
    const { sub } = req.user

    const match = await User.findOne({ sub })
    if (match) {
      const { username, _id } = match

      // get profiles for this user
      const profiles = await Profile.aggregate([
        {
          $match: { user: _id }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'username'
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            settings: 1,
            updatedAt: 1,
            username: {
              $arrayElemAt: ['$username.username', 0]
            }
          }
        }
      ])

      res.json({
        sub,
        username,
        profiles
      })
    }

    res.status(422)
    res.json({
      error: `no username defined for user ${sub}`
    })
  })

  router.put('/user', checkJwt, async (req, res) => {
    const { sub } = req.user
    const { username } = req.body

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
      { sub },
      { username },
      { new: true, upsert: true }
    )

    res.json({
      user
    })
  })

  router.get('/profile/:_id/download', async (req, res) => {
    const { _id } = req.params

    const { settings } = await Profile.findOne({ _id })

    const aip = BuildAIP(settings)

    res.set('Content-Disposition', 'inline;filename=ai-settings.aip')
    res.set('Content-Type', 'application/octet-stream')

    res.send(aip)
  })

  router.get('/profile/:_id', async (req, res) => {
    const { _id } = req.params

    const profile = await Profile.aggregate([
      {
        $match: { _id }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'username'
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          settings: 1,
          updatedAt: 1,
          username: {
            $arrayElemAt: ['$username.username', 0]
          }
        }
      }
    ])

    res.json(profile[0])
  })

  router.post('/profile', checkJwt, async (req, res) => {
    const { title, description, settings } = req.body
    // find the user
    const { sub } = req.user
    const user = await User.findOne({ sub })

    // create a dummy record
    const record = new Profile({
      user: user._id,
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

  router.put('/profile/:_id', checkJwt, async (req, res) => {
    const { _id } = req.params

    Profile.update({ _id }, req.body, (err, { _id }) => {
      if (err) console.error(err)
      res.json({
        success: true,
        _id
      })
    })
  })

  router.delete('/profile/:_id', checkJwt, async (req, res) => {
    const { _id } = req.params

    Profile.deleteOne({ _id }, (err) => {
      if (err) console.error(err)
      res.json({
        success: true
      })
    })
  })

  router.get('/user/profiles/:username', async (req, res) => {
    // find the user
    const { username } = req.params
    const user = await User.findOne({ username })

    // find all matching profiles
    const profiles = await Profile.aggregate([
      {
        $match: { user: user._id }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'username'
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          settings: 1,
          updatedAt: 1,
          username: {
            $arrayElemAt: ['$username.username', 0]
          }
        }
      }
    ])
    if (profiles) {
      res.json(profiles)
    }

    res.status(422)
    res.json({
      error: `no profiles found for user ${username}`
    })
  })

  return router
}
