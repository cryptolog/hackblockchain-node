let express = require('express')
let router = express.Router()
let passport = require('passport')
let mongoose = require('mongoose')
let Account = mongoose.model('Account')
let jwt = require('jwt-simple')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

let mailOptions = {
  from: 'noreply@hackblockcha.in',
  subject: 'Password Reset'
}

module.exports = (app) => {
  app.use('/accounts', router)
}

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/accounts/login',
  failureFlash: true
}))

router.get('/forgot', function (req, res, next) {
  res.render('password_reset')
})

router.post('/forgot', async function (req, res, next) {
  const {
    emailId
  } = req.body
  let account = null
  try {
    account = await Account.findOne({
      email: emailId
    })
  } catch (e) {
    throw e
  }
  if (account) {
    mailOptions.to = emailId
    let pwHash = account.get('hash')
    let userId = account._id
    let payload = {
      userId,
      emailId
    }
    let resetToken = jwt.encode(payload, pwHash)
    let resetBaseUrl = process.env.RESET_URI
    let resetUrl = `${resetBaseUrl}/accounts/reset/${userId}/${resetToken}`
    mailOptions.html = `Please click the link below to reset your password:<br /><a href='${resetUrl}'>Reset Password</a>`
    sgMail.send(mailOptions)
  }
  const message = "If your email address exists in our system, an email will be sent to it shortly with the password reset instructions. Please check your inbox, and if you haven't received it, please check your junk mail folder."
  res.render('message', {
    message
  })
})

router.get('/reset/:userid/:token', async function (req, res, next) {
  let {
    token,
    userid
  } = req.params
  let account = null
  try {
    account = await Account.findById(userid)
  } catch (e) {
    throw e
  }
  let decoded = null
  if (account) {
    try {
      decoded = jwt.decode(token, account.get('hash'))
    } catch (e) {
      // decode failed, suppress the error
      console.log(e)
    }
  }
  if (decoded && decoded.emailId === account.email) {
    req.session.userid = userid
    res.render('password_reset_form')
  } else {
    const message = 'Sorry the token has expired or is invalid.'
    res.render('message', {
      message
    })
  }
})

router.post('/reset', async function (req, res) {
  if (req.session.userid) {
    let {
      password
    } = req.body
    try {
      let user = await Account.findById(req.session.userid)
      await user.setPassword(password)
      await user.save()
    } catch (e) {
      throw e
    }
  } else {
    throw new Error('Page not found')
  }
  const message = 'Your password has been successfully reset, you can now log in'
  res.render('message_w_link', {
    message,
    href: '/',
    title: 'Hackblockchain | Reset Password',
    linkName: 'Login'
  })
})

router.get('/signup', function (req, res, next) {
  res.render('signup')
})

router.post('/signup', async function (req, res, next) {
  let {
    username,
    password
  } = req.body
  // create account and log in
  let user = await Account.register(new Account({
    email: username
  }), password)
  req.user = user
  res.redirect('/dashboard')
})

router.get('/logout', function (req, res, next) {
  req.logout()
  res.redirect('/')
})
