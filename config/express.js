var express = require('express')
var glob = require('glob')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compress = require('compression')
var methodOverride = require('method-override')
var nunjucks = require('nunjucks')
var session = require('express-session')
var passport = require('passport')
var helmet = require('helmet')
var expiryDate = new Date(Date.now() + 60 * 60 * 1000)
var RedisStore = require('connect-redis')(session)

module.exports = function (app, config) {
  var env = process.env.NODE_ENV || 'development'
  app.locals.ENV = env
  app.locals.ENV_DEVELOPMENT = env === 'development'
  if (app.get('env') !== 'production') {
    require('dotenv').config()
  }
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'nunjucks')
  nunjucks.configure(config.root + '/app/views', {
    autoescape: true,
    express: app
  })

  app.use(favicon(config.root + '/public/img/favicon.ico'))
  app.use(logger('dev'))

  var sessionConfig = {
    httpOnly: true,
    secret: "/g*L.>HZ'smbPF3{X/:6@5c8v'yGL76rx`pK,)[6aKH^x",
    expires: expiryDate
  }
  sessionConfig.store = new RedisStore({url: process.env.REDIS_URI})

  app.use(session(sessionConfig))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(cookieParser())
  app.use(compress())
  app.use(express.static(config.root + '/public'))
  app.use(methodOverride())
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(helmet())

  var controllers = glob.sync(config.root + '/app/controllers/*.js')
  controllers.forEach(function (controller) {
    require(controller)(app)
  })

  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      })
    })
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    })
  })

  return app
}
