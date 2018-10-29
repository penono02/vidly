const express = require('express');
const Router = express.Router();
const {Customer} = require('../models/customer.js');
const validateEntry = require('../validations/validate.js');
const {Movie} = require('../models/movie.js');




Router.post('/register', async (req, res)=>{

     const customer = await Customer({
       username:req.body.username,
       name:validateEntry(req.body.name),
       isGold:req.body.isGold,
       phone: req.body.phone
     });

     customer.save((err)=>{
       if (err) return handleError(err);
       res.redirect('/');
       console.log('Customer sucessfully added');
     });

});

Router.post('/login', async (req, res)=>{
     const customer = await Customer.findOne({username:req.body.username});

      if(!customer){
        console.log("username doesn't exist");
        return;
      }


    const result= await Movie
      .find()
      .sort('title');

    if(!result) return;

      res.render('login', {
      findAllMovies: result
    });

     console.log(customer);
});

function handleError(err){
  for (field in err.errors){
    console.log (err.errors[field].message);
  }
}

module.exports = Router;
