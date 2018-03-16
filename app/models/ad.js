// main model for the ad

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AdSchema = new Schema({
  title: String,
  description: String,
  jobType: String,
  apply: String,
  location: String,
  expires: Date,
  user_id: String
})

AdSchema.virtual('date').get(function () {
  return this._id.getTimestamp()
})
// TODO associations
// TODO created/updated at

mongoose.model('Ad', AdSchema)
