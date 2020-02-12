const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: { len: [4, 32] }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 32] }
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Task, {
      foreignKey: 'user'
    })
  }

  User.beforeCreate(user => {
    return bcrypt.hash(user.password, saltRounds).then(hash => {
      user.password = hash
    })
  })

  return User
}
