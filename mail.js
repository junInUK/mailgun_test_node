const { json } = require('body-parser');

require('dotenv').config();

class MyMailGun {

    constructor(from, to, subject, text) {
        this.mailgun = require("mailgun-js");
        this.mg = this.mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    sendmailgun(callback){
        let result = null;
        const data = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text
        };
        this.mg.messages().send(data, function (error, body) {
            console.log(body);
            if(error){
                console.log(error);
                result = JSON.stringify({ code: 500, message: error});
                if(callback){
                    callback(result);
                }
            }else{
                console.log("no error!");
                result = JSON.stringify({ code: 200, message: body});
                console.log("after sendmail result:"+result);
                if(callback){
                    callback(result);
                }
            }
        })
    
    }
}

module.exports = MyMailGun;
