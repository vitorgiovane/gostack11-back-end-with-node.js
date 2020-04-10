const express = require('express')

const server = express()

server.get('/', (request, response) => response.json({ message: "Hello, Vitor!" }))

server.listen(3333, () => {
  console.log("...\n🚀️ back-end started\n")
})
