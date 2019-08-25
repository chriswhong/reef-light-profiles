const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  parameter: String,
  value: Number,
  timestamp: Date
})

module.exports = userSchema
