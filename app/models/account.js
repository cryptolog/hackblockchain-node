var mongoose = require('mongoose')
var Schema = mongoose.Schema
let {isEmail, isAlpha} = require('validator')
var passportLocalMongoose = require('passport-local-mongoose')

var AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return isEmail(v)
      }
    }
  },
  quota: {type: Number, default: 3, min: 1},
  first: {
    type: String,
    validate: {
      validator: function (v) {
        return isAlpha(v)
      }
    }
  },
  last: {
    type: String,
    validate: {
      validator: function (v) {
        return isAlpha(v)
      }
    }
  }
}, {
  timestamps: true
})

AccountSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

mongoose.model('Account', AccountSchema)

module.exports = mongoose.model('Account', AccountSchema)
