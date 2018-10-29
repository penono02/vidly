
const session = require('client-sessions');

module.exports = function(app){

  app.use(session({
    cookieName:'session',
    secret:'1234',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  }));

}
