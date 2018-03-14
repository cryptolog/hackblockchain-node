// Example model

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
})

ArticleSchema.virtual('date')
  .get(function () {
    return this._id.getTimestamp()
  })

mongoose.model('Article', ArticleSchema)
