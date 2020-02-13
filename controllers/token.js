const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const userService = require('../services/user')

const secret = process.env.TODO_LIST_SECRET || crypto.randomBytes(30)
const noValidationNeeded = [
  ['/tokens', 'POST'],
  ['/users', 'POST'],
  ['/users', 'PUT'],
  ['/users', 'DELETE']
]

async function auth (username, password) {
  const user = await userService.get(username)
  if (!user) throw Error('UserNotFound')
  const result = await bcrypt.compare(password, user.password)
  if (!result) throw Error('UserAuthFailed')
  return user
}

router.post('/', (req, res) => {
  auth(req.body.username, req.body.password).then(user => {
    jwt.sign({ username: user.username, updatedAt: user.updatedAt },
      secret, (err, token) => {
        if (err) res.status(500).end()
        else res.send({ token })
      })
  }).catch(err => {
    if (err.message === 'UserAuthFailed') res.status(401)
    else if (err.message === 'UserNotFound') res.status(404)
    else res.status(500)
    res.end()
  })
})

router.delete('/', (req, res) => {
  userService.refreshUpdatedAt(req.username).then(result => {
    res.end()
  }).catch(() => {
    res.status(500).end()
  })
})

function validate (req, res, next) {
  let bypass = false
  for (const rule of noValidationNeeded) {
    if (req.url === rule[0] && req.method === rule[1]) {
      bypass = true
    }
  }

  if (!bypass) {
    jwt.verify(req.headers.token, secret, (err, payload) => {
      if (err) {
        res.status(401).end()
      } else {
        userService.get(payload.username).then(user => {
          payload.updatedAt = (new Date(payload.updatedAt)).getTime()
          if (!user) {
            res.status(404).end()
          } else if (payload.updatedAt === user.updatedAt.getTime()) {
            req.username = payload.username
            next()
          } else {
            res.status(401).end()
          }
        })
      }
    })
  } else {
    next()
  }
}

module.exports = { auth, router, validate }
