const express = require('express');
const router = express.Router();
const validateEntry = require('../validations/validate.js');
const {Movie, validate} = require('../models/movie.js');
const {Genre} = require('../models/genre.js');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');



router.get('/', auth, async (req, res)=>{

    const movie = await Movie.find();
    console.log(req.user);

    res.render('movie',{
      findAllMovies: movie
    });

});


router.post('/create', async (req, res)=>{

//console.log(req.body);

  const {error} = validate(req.body);

  if(error) return console.log(res.status(400).send(error.details[0].message));


  const genre =  await Genre.findOne({name:req.body.genre});

 if (!genre) return console.log('genre not found!');

  const movie = await Movie({
       title:validateEntry(req.body.title),
       genre:new Genre({_id:genre._id, name:genre.name}),
       numberInStock:req.body.numInStock,
       dailyRentalRate: req.body.dailyRentalRate
     });

     movie.save((err)=>{
       if (err) handleError(err);
       console.log('Movie added successfully');


     });

   res.redirect('/');

});

router.post('/update', async (req, res)=>{

    const movie = await Movie.findById(req.body.updateId);
    movie.numberInStock = req.body.updateNumInStock;
    movie.genre.name =req.body.updateGenre;
    movie.save(err=>{
      if (err) handleError(err);
      res.redirect('/');
      console.log('Sucessfully updated');

    })

});

router.post('/delete', async (req, res)=>{

    const movie = await Movie.findByIdAndRemove(req.body.deleteId);

    movie.save(err=>{
      if (err) handleError(err);
      res.redirect('/');
      console.log('Sucessfully deleted');

    })

});

function handleError(err){
  for (field in err.errors){
    console.log (err.errors[field].message);
  }
}

module.exports = router;
