const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/session')(app);
require('./startup/config')();
require('./startup/db')();
require('./startup/handlebars')(app);
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/prod')(app);
//require('./startup/mail')();


const port = process.env.PORT || 3000;
const server = app.listen(port, ()=> winston.info(`Listening on port ${port} ...`));


module.exports = server;
