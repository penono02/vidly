const jwt = require('jsonwebtoken');
const config = require('config');
const {User} = require('../models/user');

 function auth(req, res, next){  //next here will pass control to the next route handler
/*  const token = req.header('x-auth-token');
  console.log('Token = ' +  token);
  if(!token) return res.status(401).send('Access denied. No token provided');


  try{
    const decoded = jwt.verify(token, config.get('jwtPrivateKey')); //decoded here is the payload
    req.user = decoded;   //now you pass the payload to an object req.user.
                          //remember the payload only has the mongodb _id of the specific user
    next();              // to get the id in your route handler , you do req.user._id
  }
  catch(ex){
    res.status(400).send('Invalid Token.');
  }
  */

  if (req.session && req.session.token){  // check if session exists. if it does, retrieve and store it
      const token = req.session.token;
      if(!token) return res.status(401).send('Access denied. No token provided');

      try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); //decoded here is the payload
        req.user = decoded;   //now you pass the payload to an object req.user.once passed, you can access the user info anywhere in your app, using req.user.fieldname
                              //remember the payload only has the mongodb _id of the specific user
                           // to get the id in your route handler , you do req.user._id
        //delete req.user.password // delete password if there is a password key
        req.session.user = decoded;  //refresh the session
        res.locals.user =  decoded;   //allow user to access data in views/html


        next();
      }
      catch(ex){
        req.session.reset();
        res.status(400).send('Invalid Token.');
      }


   }else{
     res.render('auth');
    return console.log('session failed or logged in user is not an admin');

     next();
   }



}

module.exports = auth;
