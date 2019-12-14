const mailer = require('../../sendgrid-mailer.js')

export default (req, res) => {
  const { email = '' } = req.body
  mailer.addContact(email).then(() => {
    res.send("OK")
  }).catch((error) => {
    console.log('/api/addcontact failed', error)
    res.status(500).json({error: `contact [${email}] could not be sent`})
  })
}
