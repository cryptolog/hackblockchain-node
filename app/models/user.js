// Example model

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    paid: {type: DataTypes.BOOLEAN, defaultValue: true},
    email: {type: DataTypes.STRING,
      validate: {isEmail: true}
    },
    password: {type: DataTypes.STRING},
    quota: {type: DataTypes.INTEGER, defaultValue: 1},
    company: {type: DataTypes.BOOLEAN, allowNull: true},
    companyName: {type: DataTypes.STRING, allowNull: true},
    companyUrl: {type: DataTypes.STRING,
      validate: {isUrl: true},
      allowNull: true},
    companyLogo: {type: DataTypes.STRING, allowNull: true},
    pro: {type: DataTypes.BOOLEAN, default: false} // type of account
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
