var express = require('express')
var router = express.Router()
// var db = require('../models')

module.exports = function (app) {
  app.use('/user', router)
}

router.get('/', (req, res, next) => {
  return res.render('index.nunjucks')
})
