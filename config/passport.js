var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
// import model
var User = mongoose.model('User')

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({email: username}, (err, user) => {
    if (err) return done(err)

    if (!user) {
      return done(null, false, {message: 'incorrect username'})
    }

    if (!user.validPassword(password)) {
      return done(null, false, {message: 'Incorrect password'})
    }

    return done(null, user)
  })
}))

module.exports = passport
