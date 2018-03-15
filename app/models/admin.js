var mongoose = require('mongoose')
var Schema = mongoose.Schema

var adminSchema = new Schema({
  email: String,
  password: String
})

mongoose.model('Admin', adminSchema)
