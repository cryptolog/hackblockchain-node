// Example model

module.exports = function (sequelize, DataTypes) {
  var Ad = sequelize.define('Ad', {
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    jobType: {type: DataTypes.ENUM('Freelance', 'Full Time', 'Part Time', 'Internship')},
    apply: {type: DataTypes.STRING,
      allowNull: false // i think default is false
    },
    location: {type: DataTypes.STRING},
    expires: {type: DataTypes.DATE},
    // createdAt/updatedAt added automatically
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE
      }
    }
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
