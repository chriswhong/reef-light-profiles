const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  type: String,
  value: Number,
  date: Date
})

module.exports = userSchema
