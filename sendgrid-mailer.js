const sgMail = require('@sendgrid/mail')

const send = ({email, name, text}) => {
  sgMail.setApiKey(process.env.SENDGRID_API)
  let msgText = text.length > 0 ? text : `${email} signed up for Sacshiki`;
  let msgHtml = msgText;

  let msg = {
    to: 'wilsonaustin17@gmail.com',
    // to: 'cameron@sacshiki.com',
    from: email,
    subject: `Sacshiki Sign Up From ${email}`,
    text: msgText,
    html: msgHtml,
  }
  return new Promise((resolve, reject) => {
    sgMail.send(msg, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

exports.send = send;
