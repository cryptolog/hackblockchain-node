// Example model

module.exports = function (sequelize, DataTypes) {
  var Ad = sequelize.define('Article', {
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    apply: {type: DataTypes.STRING},
    location: {type: DataTypes.STRING},
    expires: {type: DataTypes.DATE}
    // createdAt/updatedAt
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  })

  return Ad
}
