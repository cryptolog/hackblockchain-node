var path = require('path')
var rootPath = path.normalize(__dirname + '/..')
var env = process.env.NODE_ENV || 'development'

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'hbc'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/hbc-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'hbc'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/hbc-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'hbc'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/hbc-production'
  }
}

module.exports = config[env]
