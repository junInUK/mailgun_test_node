require('dotenv').config();

const MyMailGun = require('./mail');

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const app = express();


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
	let myMailGun = new MyMailGun(req.body.from, req.body.to, req.body.subject, req.body.text);
	let result = myMailGun.sendmailgun();
	console.log(result);
	
	res.status(200);
	res.json({ status: 200, message: "Very Good"});
});

//	add route in the Express app.
app.use("/api/sendmail", router);

app.listen(process.env.PORT, function () {
	console.log(`App running on port ${ this.address().port }`)
});



