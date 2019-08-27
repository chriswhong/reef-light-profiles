const JwtStrategy = require('passport-jwt').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const { jwtOptions } = require('./config')

module.exports = (passport, User) => {
  // facebook strategy handles initial signup and saves a new user in the DB
  // also used on subsequent logins
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({
      'facebook.id': profile.id
    }, (err, user) => {
      if (err) {
        return done(err)
      }
      // create a new user in the DB based on these facebook profile values
      if (!user) {
        user = new User({
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          provider: 'facebook',
          facebook: profile._json
        })

        user.save((err) => {
          if (err) console.error(err)
          return done(err, user)
        })
      } else {
        // found user. Return
        return done(err, user)
      }
    })

    return done(null, profile)
  }
  ))

  // protected api requests require a valid
  passport.use(new JwtStrategy({
    secretOrKey: jwtOptions.secret,
    issuer: jwtOptions.issuer,
    audience: jwtOptions.audience,
    jwtFromRequest: (req) => {
      var token = null
      if (req && req.cookies) {
        token = req.cookies.jwt
      }
      return token
    }
  }, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.sub }, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
