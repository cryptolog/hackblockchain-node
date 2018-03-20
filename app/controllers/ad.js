var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

module.exports = function (app) {
  app.use('/ad', router)
}

router.get('/ad', function (req, res, next) {
  // render create ad form
  // have to check whether the current user's quota allows
  return res.render('createAd')
})

// return the corresponding ad
router.get('/ad/:id', function (req, res, next) {
  // print the stuff here
})
