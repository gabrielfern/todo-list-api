module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { len: [2, 64] }
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('TODO', 'DOING', 'DONE'),
        allowNull: false
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { len: [4, 32] },
        references: {
          model: 'Users',
          key: 'username'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks')
  }
}
