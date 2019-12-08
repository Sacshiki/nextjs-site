const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.SENDGRID_API
  }
}))

const send = ({ email, name, text }) => {
  console.log("API KEY: ", process.env.SENDGRIDAPI)
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from,
    to: 'wilsonaustin17@gmail.com',
    subject: `New message from ${from}`,
    text,
    replyTo: from
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

exports.send = send;
