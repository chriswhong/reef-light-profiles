const jwtOptions = {
  expiresIn: '1 week',
  issuer: 'reef-log',
  audience: 'reef-log',
  secret: process.env.JWT_SECRET
}

module.exports = {
  jwtOptions
}
