const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('dotenv').config() // reads .env from root of project

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.post('*', (req, res) => {
    console.log("POST-------------------------------");
    console.log(req,res);
    return handle(req, res)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3001, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:3001')
  })
})
