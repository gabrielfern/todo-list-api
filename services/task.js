const { Task } = require('../models')

function create (title, description, status, user) {
  return Task.create({ title, description, status, user })
}

function get (id, user) {
  return Task.findOne({ raw: true, where: { id, user } })
}

function getAll (user) {
  const where = user ? { user } : {}
  return Task.findAll({ raw: true, where })
}

function update (title, description, status, id, user) {
  return Task.update({ title, description, status }, { where: { id, user } })
}

function remove (id, user) {
  return Task.destroy({ where: { id, user } })
}

module.exports = { create, get, getAll, update, remove }
