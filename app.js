const express = require('express')
const path = require('path')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const mustacheExpress = require('mustache-express')
const proxy = require('http-proxy-middleware')
const logger = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userSchema = require('./schemas/user')
const recordSchema = require('./schemas/record')

const app = express()

console.log(process.env.MONGO_URI)
// establish database connection
mongoose.connect(process.env.MONGO_URI)
// create a user model
const User = mongoose.model('User', userSchema)
const Record = mongoose.model('Record', recordSchema)

// allows CORS
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
})

// view engine setup
app.engine('html', mustacheExpress())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

require('./auth.js')(passport, User)
app.use(passport.initialize())

app.use('/', require('./routes')(passport, User, Record))

// proxy requests to the react dev server
// TODO: make sure this only happens in development mode
app.use('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }))
app.use('/static/*', proxy({ target: 'http://localhost:3000/static', changeOrigin: true }))
app.use('/sockjs-node/*/*/websocket', proxy({ target: 'http://localhost:3000/sockjs-node/*/*/websocket', changeOrigin: true }))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  console.error(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
