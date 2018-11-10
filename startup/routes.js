const express = require('express');
const genre = require('../routes/genre');
const users = require('../routes/user');
const rental = require('../routes/rental');
const auth = require('../routes/auth');
const movieApi = require('../routes/movie');
const customerApi = require('../routes/customer');
const returns = require('../routes/returns');
const error = require('../middleware/error');
const bodyParser = require('body-parser');
const home = require('../routes/index');
const rented = require('../routes/rented');
const sendEmail = require('../messaging/sendEmail');
const sendText = require('../messaging/sendText');

module.exports = function (app){

  app.use(bodyParser.urlencoded({extended:false}));
  app.use('/', home);
  app.use('/api/messaging', sendEmail);
  app.use('/api/sendText', sendText);
  app.use('/api/genre', genre);
  app.use('/api/rental', rental);
  app.use('/api/movie', movieApi);
  app.use('/api/customer', customerApi);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns); //for any requests that goes to /api/returns, we wanna use this router - returns
  app.use('/api/rented', rented);
  app.use(error);

}
