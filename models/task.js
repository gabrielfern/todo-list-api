module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 64] }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('TODO', 'DOING', 'DONE'),
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [4, 32] },
      references: {
        model: 'Users',
        key: 'username'
      }
    }
  })

  Task.associate = function (models) {
    Task.belongsTo(models.User, {
      foreignKey: 'user'
    })
  }

  return Task
}
