var express = require('express')
var router = express.Router()

module.exports = (app) => {
  app.use('/accounts', router)
}
