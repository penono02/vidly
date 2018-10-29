const express = require('express');
const router = express.Router();
const {Customer} = require('../models/customer.js');
const {Movie} = require('../models/movie.js');
const {Rental, validate} =  require('../models/rental.js');
const {UserRental, validateId} =  require('../models/rentalEd.js');
const {User} =  require('../models/user.js');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');



Fawn.init(mongoose);

router.get('/', async (req, res)=>{

 const customer = await Customer.find();
  const movie = await Movie.find();

 if (!customer) return;
  if (!movie) return;

  res.render('rental', {
    customer,
    movie
  });
});


/* MOSH version
router.post('/', async (req, res)=>{

const {error} = validate(req.body);

 if(error) return res.status(400).send(error.details[0].message);

const customer = await Customer.findById(req.body.customerId);
if (!customer) return res.status(400).send('invalid customer');

const movie = await Movie.findById(req.body.movieId);
if (!movie) return res.status(400).send('Invalid movie');

if (movie.numberInStock ===0) return res.status(400).send('Movie is not in stock');




  let rental = await Rental({
      customer:{
        _id: customer._id,
        name:customer.name,
        phone:customer.phone
      },
      movie:{
        _id:movie._id,
        title:movie.title,
        dailyRentalRate: movie.dailyRentalRate
      },
 //Date out is date.now so it will take care of itself. Date returned is when user
  //returns the movie
   });



//rental =  await rental.save();
//movie.numberInStock--;
//movie.save;
try{
  new Fawn.Task()
      .save('rentals', rental)
      .update('movies', {_id:movie._id}, {
        $inc: {numberInStock: -1}
      })
      .run();
  res.send(rental);
}
catch(ex){
 res.status(500).send('something failed');
}





 res.render('rental',{
   rental,
   customer,
   movie
 });


});
*/
//Ed version to use support Ed's enhancement to the program

router.post('/', auth, async (req, res)=>{

let rental='';
let movie='';
let user='';
let userRental='';
let id ='';



if(!req.body.movies) return res.status(403).send('invalid id');
if(!req.user) return res.render('auth');

user = await User.findById(req.user._id);

if (!user){
  return console.log('no user was found');
}

let fields = req.body.movies.toString();
let fieldArray = fields.split(',');



try{

if (typeof req.body.movies==="object" &&  req.body.movies !=null && req.body.movies instanceof Array){


  for(id in fieldArray ){

    movie = await  Movie.findById(fieldArray[id]);

    if (movie.numberInStock ===0) return res.status(400).send('Movie is not in stock');



          userRental = await UserRental({
            user:{                    //user here is the currently logged in user
              _id:user._id,
              name:user.name,
              email:user.email,
              phone:user.phone
            },

            movie:{
            _id: movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
          },

          });

      //  userRental.save(async(error)=>{
    //     if(error) handleError(error);
    //    });

//must use Fawn to prevent conflicts or when bad things happen
//like a disconnect in the middle of saving
      new Fawn.Task()
      .save('rentaleds', userRental)
      .update('movies', {_id:movie._id},{
            $inc: {numberInStock: -1}
      })
      .run();

   }

   const allRented = await UserRental.find();
    return res.render('rentedout',{
      rentedMovies: allRented
  });

}

}catch(err){
  console.log(err);
}

//single movies

try{
movie = await  Movie.findById({_id:req.body.movies});

if (movie.numberInStock ===0) return res.status(400).send('Movie is not in stock');

userRental = await UserRental({
      user:{                    //user here is the currently logged in user
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone
      },

      movie:{
      _id: movie._id,
      title:movie.title,
      dailyRentalRate:movie.dailyRentalRate
    },

});

/*
userRental.save(async (error)=>{
   if(error) handleError(error);

     const allRented = await UserRental.find();
        res.render('rentedout',{
          rentedMovies: allRented
        });

  });

  */
  //must use Fawn to prevent conflicts or when bad things happen
  //like a disconnect in the middle of saving

  new Fawn.Task()
  .save('rentaleds', userRental)
  .update('movies', {_id:movie._id},{
        $inc: {numberInStock: -1}
  })
  .run();


  const allRented = await UserRental.find();
     res.render('rentedout',{
       rentedMovies: allRented
     });

}
catch(err){
  res.send('catch error = ' + err);
}




});






function handleError(err){
  for (field in err.errors){
    console.log (err.errors[field].message);
  }
}

module.exports=router;
