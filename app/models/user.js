// Example model
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  paid: {type: Boolean, required: true},
  quota: {type: Number, default: 5},
  companyName: String,
  companyUrl: String,
  companyLogo: String
}, {
  timestamps: true
})

UserSchema.virtual('date').get(function () {
  return this._id.getTimestamp()
})

mongoose.model('User', UserSchema)
