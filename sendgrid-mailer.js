const sgMail = require('@sendgrid/mail') // TODO remove unused mail packages

const send = ({email, name, text}) => {
  sgMail.setApiKey(process.env.SENDGRID_API)
  let msg = {
    to: 'wilsonaustin17@gmail.com', // TODO set this as a config or .env variable?
    from: email,
    subject: `Sacshiki Sign Up From ${email}`,
    text: `${email} signed up for Sacshiki`,
    html: `${email} signed up for Sacshiki`,
  }
  return new Promise((resolve, reject) => {
    sgMail.send(msg, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

exports.send = send;
