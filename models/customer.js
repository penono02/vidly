const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username:{
       type:String,
       required: true,
       minlength:5,
       maxlength:10
  },
  name:{
    type:String,
    required: true,
    minlength:5,
    maxlength:25
  },
  isGold: Boolean,
  phone:{
    type:String,
    minlength:10,
    maxlength:14
  }
});

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;
