var express = require('express')
var router = express.Router()
let passport = require('passport')
let mongoose = require('mongoose')
let Account = mongoose.model('Account')
let jwt = require('jwt-simple')

module.exports = (app) => {
  app.use('/accounts', router)
}

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/forgot', function (req, res, next) {
  res.render('password_reset')
})

router.post('/forgot', function (req, res, next) {
  const {emailId} = req.body
  Account.findOne(emailId, function (err, result) {
    if (err) throw err
    if (result) {
      let pwHash = result.password
      let createdAt = result.createdAt
      let userId = result.id
      let resetToken = jwt.encode(userId, pwHash + '-' + createdAt)
      let resetUrl = `https://www.hackblockcha.in/accounts/reset/{resetToken}`
      mailgun.send('template', this)
      // create a link and send the email
    }
    res.render('password_reset_email_sent')
  })
})

router.get('/reset/:id', function (req, res, next) {
  // this is it

})

router.post('/reset', function (req, res, next) {
  // do something
})

router.post('/passwordreset', function (req, res) {
  const { email } = req.body
  Account.findById(email, function (err, user) {
    if (err) throw err
    // if found then send an email
    // otherwise ?
  })
})

router.get('/signup', function (req, res, next) {
  res.render('signup')
})

router.post('/signup', function (req, res, next) {
  // validate the password here
  res.redirect('/signup', {failureFlash: true})
  // create an account and redirect to success page
  // didn't get an email, resend it?
})
