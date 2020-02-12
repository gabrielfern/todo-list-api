const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const userService = require('../services/user')

const secret = process.env.TODO_LIST_SECRET || crypto.randomBytes(30)
const noAuthNeeded = [
  ['/auth', 'POST'],
  ['/users', 'POST']
]

function auth (req, res) {
  userService.get(req.body.username).then(user => {
    if (!user) {
      res.status(404).end()
    } else {
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (!result) {
          res.status(401).end()
        } else {
          jwt.sign({ username: req.body.username }, secret, (err, token) => {
            if (err) res.status(500).end()
            else res.send({ token })
          })
        }
      })
    }
  }).catch(() => {
    res.status(500).end()
  })
}

function validate (req, res, next) {
  let bypass = false
  for (let rule of noAuthNeeded) {
    if (req.url == rule[0] && req.method == rule[1])
      bypass = true
  }

  if (!bypass) {
    jwt.verify(req.headers.token, secret, (err, payload) => {
      if (err) {
        res.status(401).end()
      } else {
        req.username = payload.username
        next()
      }
    })
  } else {
    next()
  }
}

module.exports = { auth, validate }
