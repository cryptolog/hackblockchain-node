var express = require('express')
var router = express.Router()
let passport = require('passport')
let mongoose = require('mongoose')
let Account = mongoose.model('Account')
let jwt = require('jwt-simple')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

let mailOptions = {
  'from': 'noreply@hackblockcha.in',
  'to': '',
  'subject': 'Hackblockchain Password Reset'
}

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
      let payload = {userId, emailId}
      let resetToken = jwt.encode(payload, pwHash + '-' + createdAt)
      let resetUrl = `https://www.hackblockcha.in/accounts/reset/${userId}/${resetToken}`
      mailOptions.text = resetUrl
      sgMail.send(mailOptions)
    }
    res.render('password_reset_email_sent')
  })
})

router.get('/reset/:userid/:token', function (req, res, next) {
  let {token, userid} = req.params
  Account.findById(userid, function (err, result) {
    if (err) throw err
    let decoded = null
    try {
      decoded = jwt.decode(token, result.password + '-' + result.createdAt)
    } catch (err) {
      decoded = null
    }
    if (result.email === decoded.emailId) {
      // token is valid
      res.render('password_reset_form', {userid})
    } else {
      // token invalid
      res.render('password_invalid_token')
    }
  })
})

router.post('/reset', function (req, res, next) {
  // do something
  let {userid, newpassword} = req.body
  // TODO on this
  Account.findByIdAndUpdate(userid, {password: newpassword})
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
