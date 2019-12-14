const mailer = require('../../sendgrid-mailer.js')

export default (req, res) => {
  const { email = '', name = '', message = '' } = req.body
  mailer.send({ email, name, text: message }).then(() => {
    res.send("OK")
  }).catch((error) => {
    console.log('/api/email failed', error)
    res.status(500).json({error: "email could not be sent"})
  })
}
