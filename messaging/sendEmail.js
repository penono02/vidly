const config = require('config');
const express = require('express');
const router = express.Router();
//const sendgrid = require('sendgrid')(config.get('emailPassword'), config.get('emailApi_key'));
const helper = require('sendgrid').mail;

router.get('/', function(req, res){
/*
  sendgrid.send({
    to: 'babynaya0208@gmail.com',
    from:'nayahtest@gmail.com',
    subject:'a test to remember',
    text:'Yes testing with Sendgrid'


  }, function(err,json){
    if (err) {return console.log(err);}
    console.log(json);
  });
*/


const fromEmail = new helper.Email('nayahtest@gmail.com');
const toEmail = new helper.Email('babynaya0208@gmail.com');
const subject = 'Sending with SendGrid is Fun';
const content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
const mail = new helper.Mail(fromEmail, subject, toEmail, content);

const sg = require('sendgrid')(config.get('emailApi_key'));
const request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function (error, response) {
  if (error) {
    console.log('Error response received');
  }
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
  res.redirect('/');
});


});

module.exports= router;
