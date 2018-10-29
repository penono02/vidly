const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');



module.exports = function(){
  const output = `
  <h3> Password reset<h3>
  <p> Please click on following link below to reset your password </p>

  <p><a href='#'>Please click me to reset your password</a></p>

  `;


const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    type: 'Oauth2',
    user: 'nayahtest@gmail.com',
    clientId:'228705790040-5fole74207dnlej1rq5a4b3dcvcq579e.apps.googleusercontent.com',
    clientSecret:'dVCkZH2fRjHsQWluyOdxFt8o',
    refreshToken:'1/gnKmyLHCKloa80irjS6G3OC8F2_HqXIt2g3iS32TyZo',
    accessToken:'ya29.GltABnVFOySfWXQZFoNpty_y7p3WaqP5A6kYo-f5nJ3aWADJATQ4tSz_-aIJTZ9XWIrrWRpz09Eq99bD4iayJ6vHalNnW8MM8xX_DUO1GgIHx2AjKJfNYiUn_W3m'


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



}
