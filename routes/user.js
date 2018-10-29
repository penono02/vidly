const bcrypt = require('bcrypt');
const _ = require('lodash'); //you can use any constant name here if you like but we'll user an underscore object
const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user.js');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');




router.get('/me',auth, async(req,res)=>{ // /me here the client will not send a user id, we get it from the json web token
                                 //auth here is not called authentication. it is called instead authorization

    //now if you want to get the user id, you get from req.user_id
    //remember in auth middlware you get the token from the req.header, validate it and save it to req.user object

    const user =  await User.findById(req.user._id).select('-password'); //you don't show the password to the user hashed/or not
    res.send(user);
});


router.get('/', (req, res)=>{
    res.render('register');
});

router.get('/forgotPassword', (req, res)=>{
   console.log(req.headers.host);
 const hostname = req.headers.host;
 const passwordResetURL  ='http://' + hostname + '/api/users/passwordreset';

try{
   const output = `
   <h3> Password reset<h3>
   <p> Please click on following link below to reset your password </p>

   <p><a href='${passwordResetURL}''>Please click me to reset your password</a></p>

   `;


   const transporter = nodemailer.createTransport({
   service:'gmail',
   auth:{
     type: 'Oauth2',
     user: 'nayahtest@gmail.com',
     clientId:'228705790040-5fole74207dnlej1rq5a4b3dcvcq579e.apps.googleusercontent.com',
     clientSecret:'dVCkZH2fRjHsQWluyOdxFt8o',
     refreshToken:'1/-0gStrn4nFgIB1ft_ajIfiq3A63hoV_J5TyrNQmlOZ4',
     accessToken:'ya29.GltBBmJbIyIuK_eTFjHIYjg9XNLvl8VfBJ6qzNRh2lJaDHNLDlXzo3uNpcKeHM0GriVCMfDjI7n9V1nBmq-N3YCB8AJS-YjAz_5kfiJih7vmtRVNOqtf31j2hPIL'


   }
   });

   let mailOptions ={
    from:'Ednology<nayahtest@gmail.com>',
    to:'babynaya0208@gmail.com',
    subject:'Testing sending password change URL',
    text:'body will be hostname + api/passwordreset',
    html: output
   }

   transporter.sendMail(mailOptions, (error, res)=>{
    if(error) return console.log(error);
    console.log('Email sent successfully');
   });
}catch(error){
  res.send(error);
}


});

router.get('/passwordreset', (req, res)=>{
    res.render('passwordreset');

});

router.post('/passwordreset', async (req,res)=>{

  const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({email:req.body.email});
      if (!user) return res.render('passwordreset',{emailErr:'Your email was not found'});

      if(req.body.password != req.body.confirmpassword){
         return res.render('passwordreset',{
           passwordErr:'Your new password is different from your confirm password'
       });
      }


     const salt =   await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(req.body.password, salt);

      user.save((error)=>{
          if (error) return handleError(error);
          res.render('auth');

      });



});

router.post('/', async (req, res)=>{

  const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(400).send('User already registered');

console.log(req.body);

  user =  new User(_.pick(req.body, ['name', 'email','password', 'phone','true']));

  const salt =   await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

     await user.save((error)=>{
         if(error) handleError(error);
      const token = user.generateAuthToken();  //will generate a token
      //req.header('x-auth-token', token);

      res.header('x-auth-token',token).send( _.pick(user, ['_id','name', 'email']));

     });

});


function handleError(err){
  for (field in err.errors){
    console.log (err.errors[field].message);
  }
}

module.exports = router;
