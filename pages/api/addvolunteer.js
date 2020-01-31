const mailer = require('../../sendgrid-mailer.js')

export default (req, res) => {
  const {
    email = '',
    first_name = '',
    last_name = '',
    interests = '',
    how_they_found_out = '',
  } = req.body

  console.log("API==================");
  console.log(req.body);
  console.log("API==================");

  mailer.addVolunteer(email, first_name, last_name, interests, how_they_found_out).then(() => {
    res.send("OK")
  }).catch((error) => {
    console.log('/api/addvolunteer failed', error)
    res.status(500).json({error: `contact [${email}] could not be sent`})
  })
}
