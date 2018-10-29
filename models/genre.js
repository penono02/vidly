const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  }
});


const Genre = mongoose.model('Genre', genreSchema);

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;