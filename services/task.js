const { Task } = require('../models')

function create (title, description, status, user) {
  return Task.create({ title, description, status, user })
}

function get (id) {
  return Task.findOne({ raw: true, where: { id } })
}

function getAll (user) {
  const where = user ? { user } : {}
  return Task.findAll({ raw: true, where })
}

function update (title, description, status, id) {
  return Task.update({ title, description, status }, { where: { id } })
}

function remove (id) {
  return Task.destroy({ where: { id } })
}

module.exports = { create, get, getAll, update, remove }
