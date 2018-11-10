
const client = require('twilio')('AC58dd1981b9deaaf29bd5b1bb12faf9b2', '81201bd1f6f2db87f0c2506677197818');
const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
  client.messages.create({
    to:'12037476990',
    from:'12039165876',
    body:'Test from twilio'
  }, (err, data)=>{
      if (err) console.log(err);
      console.log(data);
      res.redirect('/');
  });

});


module.exports = router;
