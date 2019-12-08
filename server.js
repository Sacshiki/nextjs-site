
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mailer = require('./sendgrid-mailer.js')
console.log(mailer);

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.post('/api/contact', (req, res) => {
    const { email = '', name = '', message = '' } = req.body
    console.log(req.body);

    mailer.send({ email, name, text: message }).then(() => {
      res.send("OK")
    }).catch((error) => {
      console.log('/api/contact failed', error)
      res.status(500).json({error: "email could not be sent"})
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3001, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:3001')
  })
})
