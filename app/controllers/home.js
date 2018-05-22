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

router.get('/dashboard', async function (req, res, next) {
  let user = req.user
  if (user) {
    const ads = await Ad.find({userid: user._id})
    if (ads) {
      res.render('dashboard', {ads})
    } else {
      res.render('message_w_link', {
        title: 'Dashboard',
        href: '/ad/new',
        linkName: 'Create your first ad',
        message: `You haven't posted any ads yet!`
      })
    }
  } else {
    res.status(401).send('<h3>401</h3><h6>Unauthorized</h6>')
  }
})
