const {UserRental, validateId} =  require('../models/rentalEd.js');
const express = require('express');
const router = express.Router();


router.get('/', async(req, res)=>{

  const allRented = await UserRental.find();

     res.render('rentedout',
     {
       rentedMovies: allRented
     });
});

module.exports = router;
