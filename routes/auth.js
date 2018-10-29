const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const Joi = require('joi');
const auth = require('../middleware/auth');
const {Movie, validate} = require('../models/movie.js');




router.get('/', (req, res)=>{
    res.render('auth');
});

router.post('/', async (req, res)=>{

    const { error } = joiValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

//console.log(req.body);
    //Let's validate the email address
    let user = await User.findOne({email: req.body.email});
    //console.log(user);
    if(!user) return res.status(400).send('Invalid email');

//let's validate the password. bcrypt has a compare method that compares the plain text password (req.body.password)
//to the hashed password to see if they're equal. if they're equal, the compare methods returns true otherwise, it retuns false
//again this method returns a callback. we will use a promise (await) instead of a callback

   const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid password'); //returns will exit with status(400)=bad request

  //finally, if the user make sit to this point or is authenticated then, appropriate page should be rendered


   const token = user.generateAuthToken();  //will generate a token
   //req.header('x-auth-token', token);
  // return this token to the client
  req.header('x-auth-token', token);

  req.session.token= token; //sets a cookie with token info


const movie = await Movie.find();

    res.render('movie',{
      findAllMovies: movie
    });



});

function joiValidate(req){
   const schema ={
     email: Joi.string().min(5).max(255).required().email(),
     password: Joi.string().min(5).max(255).required() //note here how password field is less

                                              //thats because JOI validate the client/browser data before they hit the server
   }
   return Joi.validate(req, schema);
}

module.exports = router;
