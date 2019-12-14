const sgMail = require('@sendgrid/mail')
const request = require("request");

const send = ({email, name, text}) => {
  sgMail.setApiKey(process.env.SENDGRID_API)
  let msgText = text.length > 0 ? text : `${email} signed up for Sacshiki`;
  let msgHtml = msgText;

  let msg = {
    to: 'cameron@sacshiki.com',
    from: email,
    subject: `Sacshiki Contact From ${email}`,
    text: msgText,
    html: msgHtml,
  }
  return new Promise((resolve, reject) => {
    sgMail.send(msg, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

const addContact = (email) => {
  let options = { method: 'PUT',
    url: 'https://api.sendgrid.com/v3/marketing/contacts',
    headers: { authorization: `Bearer ${process.env.SENDGRID_API}` },
    body: '{"contacts":[{"email": "'+email+'"}]}' };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) =>
        error ? reject(error) : resolve(response)
    )
  });
}

exports.send = send;
exports.addContact = addContact;
