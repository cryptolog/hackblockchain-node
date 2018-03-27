var express = require('express')
var router = express.Router()
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

router.post('/login', function (req, res, next) {
  //  passport haiku here
})

router.get('/signup', function (req, res, next) {
  res.render('signup')
})

router.post('/signup', function (req, res, next) {
  // create a new user and a new ad
})
