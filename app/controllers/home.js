let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Ad = mongoose.model('Ad')

module.exports = function (app) {
  app.use('/', router)
}

router.get('/', async function (req, res, next) {
  let latestAds = null
  try {
    latestAds = await Ad.find({}).limit(5)
  } catch (e) {
    throw e
  }
  res.render('home', {ads: latestAds})
})

router.get('/dashboard', function (req, res, next) {
  if (req.user) {
  // send the user's ads here
    res.render('dashboard')
  } else {
    res.render('message_w_link', {title: 'Dashboard', href='/ads/create', linkName: 'Create an ad', message: `You haven't posted an ads yet!`})
  }
})
