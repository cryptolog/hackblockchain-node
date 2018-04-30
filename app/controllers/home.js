let express = require('express')
let router = express.Router()
// var Ad = mongoose.model('Ad')

module.exports = function (app) {
  app.use('/', router)
}

router.get('/', function (req, res, next) {
  // send latest jobs here
  // get the latest ads
  res.render('home')
})

router.get('/dashboard', function (req, res, next) {
  // do something here
  res.render('dashboard')
})
