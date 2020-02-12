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

  return User
}
