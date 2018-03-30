var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema
let {isEmail, isAlpha, isURL} = require('validator')
// TODO images strategy

var UserSchema = new Schema({
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
  pro: {type: Boolean, required: true, default: false},
  quota: {type: Number, default: 1, min: 1},
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
  },
  companyName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return isAlpha(v)
      }
    }
  },
  companyUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return isURL(v)
      }
    }
  },
  companyLogo: String
}, {
  timestamps: true
})

UserSchema.virtual('date').get(function () {
  return this._id.getTimestamp()
})

UserSchema.virtual('validPassword').get(function (password) {
  // check if the password hash is correct
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) throw err
    return res
  })
})

mongoose.model('User', UserSchema)
