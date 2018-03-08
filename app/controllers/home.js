var express = require('express')
var router = express.Router()
var db = require('../models')

module.exports = function (app) {
  app.use('/', router)
}

router.get('/', function (req, res, next) {
  db.Article.findAll().then(function (articles) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    })
  })
})
