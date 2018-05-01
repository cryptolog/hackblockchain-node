var mongoose = require('mongoose')
var Schema = mongoose.Schema
let shortid = require('shortid')
let {isEmail, isAlpha} = require('validator')
var passportLocalMongoose = require('passport-local-mongoose')

var AccountSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
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

AccountSchema.plugin(passportLocalMongoose)

mongoose.model('Account', AccountSchema)
