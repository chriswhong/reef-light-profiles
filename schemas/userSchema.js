const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  id: String,
  name: String,
  email: String,
  username: String,
  photo: String,
  provider: String,
  facebook: {
    id: String,
    name: String,
    picture: Object,
    email: String
  }
})

module.exports = userSchema
