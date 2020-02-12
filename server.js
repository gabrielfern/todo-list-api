const express = require('express')
const app = express()
const { auth, validate } = require('./controllers/auth')
const userRoutes = require('./controllers/user')
const taskRoutes = require('./controllers/task')

app.use(express.json())
app.use(validate)
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
app.post('/auth', auth)

app.listen(process.env.PORT || 3000)
