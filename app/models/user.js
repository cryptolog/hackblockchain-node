// Example model
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: String,
  password: String,
  paid: Boolean,
  quota: Number,
  companyName: String,
  companyUrl: String,
  companyLogo: String
})

UserSchema.virtual('date').get(function () {
  return this._id.getTimestamp()
})

mongoose.model('User', UserSchema)
