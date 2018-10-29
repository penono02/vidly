const winston = require('winston');

// this middleware function will fire wherever the error happens in the application
//always use it with express-async-errors module. for more information/implementation, see my notes

module.exports = function(err, req, res, next){
  //Log the exception
//winston.log ('error', err.message);
//or you can use an helper method like error()
winston.error(err.message, err);

    res.status(500).send('Something failed');  //error 500 means internal error
}
