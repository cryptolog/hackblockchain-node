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
  res.render('home', {
    ads: latestAds
  })
})

router.get('/dashboard', function (req, res, next) {
  // if the user is logged in && has some ads
  if (req.user) {
    // fetch the user's ads
    // if none
    let ads = req.user.ads
    if (ads) {
      res.render('dashboard', {ads})
    } else {
      res.render('message_w_link', {
        title: 'Dashboard',
        href: '/ad/new',
        linkName: 'Create an ad',
        message: `You haven't posted an ads yet!`
      })
    }
  } else {
    res.status(401).send('<h3>401</h3><h6>Unauthorized</h6>')
  }
})
