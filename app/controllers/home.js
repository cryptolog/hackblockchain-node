let express = require('express')
let router = express.Router()
let passport = require('passport')
let mongoose = require('mongoose')
let Account = mongoose.model('Account')
let jwt = require('jwt-simple')
// var Ad = mongoose.model('Ad')

module.exports = function (app) {
  app.use('/', router)
}

router.get('/', function (req, res, next) {
  // send latest jobs here
  // get the latest ads
  res.render('home')
})

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
  Account.findById(emailId, function (err, result) {
    if (err) throw err
    if (result) {
      // create a link and send the email
      // create a jwt using stuff and send it
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

router.get('/dashboard', function (req, res, next) {
  // do something here
  res.render('dashboard')
})
