const Joi = require('joi');


const mongoose = require('mongoose');


const rentalSchemaEd = new mongoose.Schema({

  user: {
      type: new mongoose.Schema({
        name:{
          type: String,
          required: true,
          minlength:3,
          maxlength:100
        },
        email:{
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        },
      phone:{
          type:String,
          required: true
        },

      }),
      required: true
  },

  movie:{
    type: new mongoose.Schema({
          title:{
            type:String,
            required: true,
            trim: true,
            minlength:5,
            maxlength:100
          },
          dailyRentalRate:{
            type: Number,
            required: true,
            min: 0,
            max:255
          }
       }),
       required: true

  },
  dateOut:{
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned:{
    type: Date
  },
  rentalFee:{
    type: Number,
    min:0
  }
});

const RentalEd = mongoose.model('RentalEd', rentalSchemaEd);

function validateId (Id){

  const schema={
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  }

  return Joi.validate(Id, schema);
}

exports.UserRental = RentalEd;
exports.validateId = validateId;
