const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  sub: String,
  username: String
})

module.exports = userSchema
