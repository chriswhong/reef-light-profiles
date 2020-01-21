const express = require('express')
const path = require('path')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userSchema = require('./schemas/user')
const profileSchema = require('./schemas/profile')

const app = express()

console.log(process.env.MONGO_URI)
// establish database connection
mongoose.connect(process.env.MONGO_URI)
// create a user model
const User = mongoose.model('User', userSchema)
const Profile = mongoose.model('Profile', profileSchema)

const origin = process.env.NODE_ENV === 'production' ? 'https://reeflightprofiles.com' : 'http://localhost:3000'

// allows CORS
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/', require('./routes')(User, Profile))

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
