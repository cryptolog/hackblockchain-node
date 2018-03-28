var express = require('express')
var router = express.Router()
var passport = require('../../config/passport')
// var mongoose = require('mongoose')
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

router.get('/signup', function (req, res, next) {
  res.render('signup')
})

router.post('/signup', function (req, res, next) {
  // create a new user and a new ad
})

router.get('/dashboard', function (req, res, next) {
  // do something here
})
