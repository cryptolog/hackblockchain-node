// main model for the ad

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AdSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  jobType: {type: String, required: true},
  apply: {type: String, required: true},
  location: {type: String, required: true},
  user_id: String
}, {
  timestamps: true
})

AdSchema.virtual('date').get(function () {
  return this._id.getTimestamp()
})
// TODO associations

mongoose.model('Ad', AdSchema)
