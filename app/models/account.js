var mongoose = require('mongoose')
var Schema = mongoose.Schema
let {isEmail, isAlpha} = require('validator')
var passportLocalMongoose = require('passport-local-mongoose')
let uuidv4 = require('uuid/v4')

var AccountSchema = new Schema({
  // todo replace this with a suitable alternative
  _id: {
    type: String,
    default: uuidv4()
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
