const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function database(){

  mongoose.connect(config.get('db'),{useNewUrlParser: true})
      .then(()=>{winston.info('connected to the database');});
}
