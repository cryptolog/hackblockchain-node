// Example model

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('Article', {
    paid: {type: DataTypes.BOOLEAN},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    quota: {type: DataTypes.INTEGER, default: 1},
    company: {type: DataTypes.BOOLEAN},
    companyName: {type: DataTypes.STRING},
    companyUrl: {type: DataTypes.STRING},
    companyLogo: {type: DataTypes.STRING},
    pro: {type: DataTypes.BOOLEAN, default: false}
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
        User.hasMany(models.Ad)
      }
    }
  })

  return User
}
