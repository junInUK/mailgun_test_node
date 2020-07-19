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
	let myMailGun = new MyMailGun(req.body.from, req.body.to, req.body.subject, req.body.text);
	myMailGun.sendmailgun(function(result){
		console.log("result of sendmail:"+result);
		const obj = JSON.parse(result);
		res.status(obj.code);
		res.json({status: obj.code, message: obj.message.message});
	});
		
	// res.status(200);
	// res.json({ status: 200, message: "Very Good"});
});

//	add route in the Express app.
app.use("/api/sendmail", router);

app.listen(process.env.PORT, function () {
	console.log(`App running on port ${ this.address().port }`)
});



