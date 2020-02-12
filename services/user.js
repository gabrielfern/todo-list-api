const { User } = require('../models')

function create (username, password) {
  return User.create({ username, password })
}

function get (username) {
  return User.findOne({ raw: true, where: { username } })
}

function getAll () {
  return User.findAll({ raw: true })
}

function update (username, password) {
  return User.update({ password }, { where: { username } })
}

function remove (username) {
  return User.destroy({ where: { username } })
}

module.exports = { create, get, getAll, update, remove }
