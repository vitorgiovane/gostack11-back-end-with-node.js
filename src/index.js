const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const server = express()

server.use(cors())
server.use(express.json())

const isEmpty = obj => {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof (obj) === 'string') return obj.length === 0
  if (typeof (obj) === 'object') return Object.keys(obj).length === 0 && obj.constructor === Object
  return false
}

const logRequests = (request, response, next) => {
  const { method, url } = request
  console.log(`[${method.toUpperCase()}] ${url}`)
  console.time('logRequest')
  next()
  console.timeEnd('logRequest')
  console.log('...')
}

const validateRequestId = (request, response, next) => {
  const { id } = request.params
  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid project ID." })
  }

  return next()
}

server.use(logRequests)
server.use('/projects/:id', validateRequestId)

const projects = []

server.get('/projects', (request, response) => {
  const { name, owner } = request.query

  if (isEmpty(name) && isEmpty(owner)) {
    return response.status(200).json(projects)
  }

  let filteredProjects = projects

  if (name) {
    filteredProjects = filteredProjects.filter(project => project.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (owner) {
    filteredProjects = filteredProjects.filter(project => project.owner.toLowerCase().includes(owner.toLowerCase()))
  }

  return response.status(200).json(filteredProjects)
})

server.get('/projects/:id', (request, response) => {
  const { id } = request.params
  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) return response.status(400).json({ error: "Project not found." })

  return response.status(200).json(projects[projectIndex])
})

server.post('/projects', (request, response) => {
  const { name, owner } = request.body

  if (isEmpty(name) || isEmpty(owner)) {
    return response.status(400).json({ message: "Invalid request body" })
  }

  project = { id: uuid(), name, owner }
  projects.push(project)

  return response.status(201).json(project)
})

server.put('/projects/:id', (request, response) => {
  const { id } = request.params
  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." })
  }

  const { name, owner } = request.body
  if (isEmpty(name) || isEmpty(owner)) {
    return response.status(400).json({ message: "Invalid request body" })
  }

  projects[projectIndex] = project = { id, name, owner }

  response.status(200).json(project)
})

server.delete('/projects/:id', (request, response) => {
  const { id } = request.params
  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) return response.status(400).json({ error: "Project not found." })

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

server.listen(3333, () => {
  console.log("...\n🚀️ The back-end has started!\n")
})
