const app = require('express')()
const { sequelize } = require('./models')

app.listen(process.env.PORT || 3000)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
