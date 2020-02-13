const express = require('express')
const app = express()
const token = require('./controllers/token')
const userRoutes = require('./controllers/user')
const taskRoutes = require('./controllers/task')

app.use(express.json())
app.use(token.validate)
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
app.use('/tokens', token.router)

app.listen(process.env.PORT || 3000)
