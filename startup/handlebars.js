const hbars = require('express-handlebars');

module.exports = function(app){
  app.engine('handlebars', hbars());
  app.set('view engine','handlebars');
}
