var API_KEY = 'key-ce09cf562147948f660ac454d5a5f20f';
var DOMAIN = 'sandboxc532a4a8c4424dc3a0445b378e404e0d.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'samwulily@hotmail.co.uk',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, (error, body) => {
  console.log(body);
});