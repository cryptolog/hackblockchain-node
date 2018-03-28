var express = require('express')
var router = express.Router()
// var mongoose = require('mongoose')
// var Ad = mongoose.model('Ad')

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

router.post('/ad', function (req, res, next) {
  // create the add
  // let adObject = req.params
  // let newAd = new Ad(adObject)

})
