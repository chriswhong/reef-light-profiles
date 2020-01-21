const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema

var profileSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  user: { type: Schema.ObjectId, ref: 'User' },
  title: String,
  description: String,
  settings: Object
}, {
  timestamps: true
})

module.exports = profileSchema
