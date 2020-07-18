require('dotenv').config();

const mailgun = require("mailgun-js");

const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'samwulily@hotmail.co.uk, wj_sam@163.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});
