const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre.js');

const movieSchema = mongoose.Schema({
  title:{
    type: String,
    minlength:3,
    maxlength:100
  },
  genre: genreSchema,
  numberInStock:{
    type: Number
  },
  dailyRentalRate:{
    type: Number
  }
});

const Movie = mongoose.model('Movie', movieSchema);



function validateMovie(movie){
  const schema ={
    title:Joi.string().min(3).max(100).required(),
    numberInStock: Joi.number().min(0).required(),
    genre: Joi.string().min(3).max(100).required(),
    dailyRentalRate:Joi.number().min(0).required()
  };

   return Joi.validate(movie, schema);

}
module.exports.Movie = Movie;
module.exports.validate = validateMovie;
