const router = require('express').Router()
const userService = require('../services/user')

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
  userService.update(req.username, req.body.password).then(() => {
    res.end()
  }).catch(() => {
    res.status(500).end()
  })
})

router.delete('/', (req, res) => {
  userService.remove(req.username).then(result => {
    if (!result) res.status(404)
    res.end()
  }).catch(() => {
    res.status(500).end()
  })
})

module.exports = router
