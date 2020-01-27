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

const addVolunteer = (email, firstName, lastName, interests, how_they_found_out) => {
  let body = `{
    "list_ids": [
      "7d0b07fd-b6a5-4c5b-b3ef-c7be57b429ab"
    ],
    "contacts": [
      {
        "email": "${email}",
        "first_name": "${firstName}",
        "last_name": "${lastName}",
        "custom_fields": {
          "e3_T": "${how_they_found_out}",
          "e2_T": "${interests}"
        }
      }
    ]
  }`
  let options = { method: 'PUT',
    url: 'https://api.sendgrid.com/v3/marketing/contacts',
    headers: { authorization: `Bearer ${process.env.SENDGRID_API}` },
    body: body,
  }

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) =>
        error ? reject(error) : resolve(response)
    )
  });
}

// List Ids
// "7d0b07fd-b6a5-4c5b-b3ef-c7be57b429ab" Volunteers
// Custom Field Ids
// "id": "e2_T", "name": "interests",
// "id": "e3_T", "name": "how_they_found_out",

exports.send = send;
exports.addContact = addContact;
exports.addVolunteer = addVolunteer;
