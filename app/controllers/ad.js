var express = require('express')
var router = express.Router()
// var mongoose = require('mongoose')
// var Ad = mongoose.model('Ad')

module.exports = function (app) {
  app.use('/ad', router)
}

router.get('/new', function (req, res, next) {
  // render create ad form
  // have to check whether the current user's quota allows
  if (req.user.quota > 0) {
    return res.render('job/new.nunjucks')
  }
})

// return the corresponding ad
router.get('/:id', function (req, res, next) {
  // public endpoint
  // print the stuff here
})

router.post('/new', function (req, res, next) {
  // this is a restricted endpoint
  // create the add
  // let adObject = req.params
  // let newAd = new Ad(adObject)

})

router.patch('/:id', function (req, res, next) {
  const adId = req.params.id
  // do something here
  console.log(adId)
})
