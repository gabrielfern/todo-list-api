const router = require('express').Router()
const taskService = require('../services/task')

router.post('/', (req, res) => {
  const { title, description, status } = req.body
  taskService.create(title, description, status, req.username).then(task => {
    res.send(task)
  }).catch(() => {
    res.status(500).end()
  })
})

router.get('/', (req, res) => {
  taskService.getAll(req.username).then(tasks => {
    res.send(tasks)
  }).catch(() => {
    res.status(500).end()
  })
})

router.get('/:id', (req, res) => {
  taskService.get(req.params.id, req.username).then(task => {
    if (!task) res.status(404)
    res.send(task)
  }).catch(() => {
    res.status(500).end()
  })
})

router.put('/:id', (req, res) => {
  const { title, description, status } = req.body
  taskService.update(title, description, status, req.params.id, req.username)
    .then(() => {
      res.end()
    }).catch(() => {
      res.status(500).end()
    })
})

router.delete('/:id', (req, res) => {
  taskService.remove(req.params.id, req.username).then(result => {
    if (!result) res.status(404)
    res.end()
  }).catch(() => {
    res.status(500).end()
  })
})

module.exports = router
