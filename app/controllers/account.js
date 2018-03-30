var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = function (app) {
  app.use('/user', router)
}

/* routes here */

router.get('/', (req, res, next) => {
  return res.render('index')
})

router.get('/signup', (req, res) => {
  // send out the sign up page
  return res.render('signup')
})

router.post('/signup', (req, res) => {
  // create the user
  // req.params object
  // { email, password, company etc}
  res.send('user created')
})
