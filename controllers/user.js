const router = require('express').Router()
const userService = require('../services/user')
const { auth } = require('./token')

router.post('/', (req, res) => {
  userService.create(req.body.username, req.body.password).then(user => {
    user = user.toJSON()
    delete user.password
    res.send(user)
  }).catch(err => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(403).end()
    } else {
      res.status(500).end()
    }
  })
})

router.get('/', (req, res) => {
  userService.get(req.username).then(user => {
    if (!user) {
      res.status(404).end()
    } else {
      delete user.password
      res.send(user)
    }
  }).catch(() => {
    res.status(500).end()
  })
})

router.put('/', (req, res) => {
  auth(req.body.username, req.body.password).then(user => {
    const { password } = req.body.values
    return userService.update(user.username, password).then(() => {
      res.end()
    })
  }).catch(err => {
    if (err.message === 'UserAuthFailed') res.status(401)
    else if (err.message === 'UserNotFound') res.status(404)
    else res.status(500)
    res.end()
  })
})

router.delete('/', (req, res) => {
  auth(req.body.username, req.body.password).then(user => {
    return userService.remove(user.username).then(result => {
      if (!result) res.status(404)
      res.end()
    })
  }).catch(err => {
    if (err.message === 'UserAuthFailed') res.status(401)
    else if (err.message === 'UserNotFound') res.status(404)
    else res.status(500)
    res.end()
  })
})

module.exports = router
