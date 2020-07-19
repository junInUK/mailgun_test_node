require('dotenv').config();

const MyMailGun = require('./mail');

const express = require('express');
const bodyParser = require('body-parser');
//const MyMailGun = require('./mail');

const router = express.Router();
const app = express();

const API_KEY = 'key-ce09cf562147948f660ac454d5a5f20f';
const DOMAIN = 'sandboxc532a4a8c4424dc3a0445b378e404e0d.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

//	Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
	res.sendfile("./public/index.html");
});

router.post('/send', (req, res) => {
	//	To access POST variable use req.body() methods
	console.log(req.body.from);
	console.log(req.body.to);
	// let myMailGun = new MyMailGun(req.body.from, req.body.to, req.body.subject, req.body.text);
	// let response = myMailGun.sendmailgun();
	// console.log(response);
	// .then( () => {
	// 	res.status(response.status);
	// 	res.json({ status: response.status, message: response.message });
	// })
	// .catch(console.err);

	const data = {
		from: req.body.from,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.text
	};

	mailgun.messages().send(data, (error, body) => {
		console.log(body);
	});

	res.status(200);
	res.json({ status: 200, message: "Very Good!"});
});

//	add route in the Express app.
app.use("/api/sendmail", router);

app.listen(process.env.PORT, function () {
	console.log(`App running on port ${ this.address().port }`)
});



