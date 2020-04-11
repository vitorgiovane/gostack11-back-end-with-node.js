const express = require('express')

const server = express()

server.get('/projects', (request, response) => {
  response.json([
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" }
  ])
})

server.get('/projects/:id', (request, response) => {
  const id = parseInt(request.params.id) || 1
  response.json([
    { id, name: `Project ${request.params.id}` }
  ])
})

server.post('/projects', (request, response) => {
  response.json([
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
    { id: 4, name: "Project 4" }
  ])
})

server.put('/projects/:id', (request, response) => {
  const id = parseInt(request.params.id) || 1
  response.json([
    { id, name: `Project ${request.params.id}` }
  ])
})

server.delete('/projects/:id', (request, response) => {
  response.json([
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" }
  ])
})

server.listen(3333, () => {
  console.log("...\n🚀️ The back-end has started!\n")
})
