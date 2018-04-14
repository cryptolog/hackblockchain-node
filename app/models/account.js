var mongoose = require('mongoose')
var Schema = mongoose.Schema
let {isEmail, isAlpha} = require('validator')
var passportLocalMongoose = require('passport-local-mongoose')
// TODO images strategy

var AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return isEmail(v)
      }
    }
  },
  password: {type: String, required: true},
  quota: {type: Number, default: 1, min: 1},
  active: {type: Boolean, default: false},
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

AccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

mongoose.model('Account', AccountSchema)

module.exports = mongoose.model('Account')
