const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique:true
  },

  password:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024    //set to a big number cause we dont know how long the hash value will be

  },
  phone:{
    type:String
  },

  isAdmin: {
    type: Boolean,
    default: false
  }


});

userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));  //now that you the code in there. what do we replace user._id
                                                                      //generateAuthToken is already part of the object
                                                                      //all you have to do is replace user with this
  return token;                                                        //please note that you cannot use an arrow function here.
                                                                      //Arrow functions don't have this
                                                                      //arrow functions are used for standalone functions
                                                                      //if you're gonna use a method that uses an object
                                                                      // you cannot use arrow function

}

const User = mongoose.model('User', userSchema);


function validateUser(user){
   const schema ={
     name: Joi.string().min(5).max(50),
     email: Joi.string().min(5).max(255).required().email(),
     password: Joi.string().min(5).max(255).required(), //note here how password field is less
     confirmpassword: Joi.string().min(5).max(255),
     phone: Joi.string().min(7).max(10),
     isAdmin:Joi.boolean()

                                              //thats because JOI validate the client/browser data before they hit the server
   }
   return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validate = validateUser;
