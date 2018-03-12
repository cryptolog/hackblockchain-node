var express = require('express')
var router = express.Router()
// var db = require('../models')
var User = require('../models').User

module.exports = function (app) {
  app.use('/user', router)
}

/* routes here */

router.get('/', (req, res, next) => {
  return res.render('index.nunjucks')
})

router.get('/signup', (req, res) => {
  // send out the sign up page
  return res.render('signup')
})

router.post('/signup', (req, res) => {
  // create the user
  // inputted data will be validated against the definitions already in place
  res.send('user created')
})
