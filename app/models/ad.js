var mongoose = require('mongoose')
var Schema = mongoose.Schema
var shortid = require('shortid')
let {isAlpha} = require('validator')

var AdSchema = new Schema({
  _id: {type: String, default: shortid.generate},
  title: {type: String, required: true},
  description: {type: String, required: true},
  jobType: {
    type: String,
    enum: ['Contract', 'Full-Time', 'Part-Time', 'Internship'],
    required: true
  },
  remote: {type: Boolean, required: true, default: false},
  apply: {type: String, required: true},
  location: {type: String, required: true},
  companyName: {
    type: String,
    required: true,
    validate: {
      validator: function (input) {
        return isAlpha(input)
      }
    }
  },
  user_id: {type: Schema.Types.String, ref: 'Account'}
}, {
  timestamps: true
})

AdSchema.virtual('date').get(function () {
  return this._id.getTimestamp()
})

mongoose.model('Ad', AdSchema)
