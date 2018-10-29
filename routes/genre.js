const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const {Movie} = require('../models/movie.js');
const {Genre} = require('../models/genre.js');


router.get('/api/genre', async (req, res)=>{

  res.render('auth');

});


router.get('/api/genre/register', (req, res)=>{

  console.log('hit the registration handler');

});


router.get('/api/genre:id', validateObjectId, async(req, res)=>{
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given id does not exist');

    res.send(genre);
});

router.get('/api/genre/:id', [auth, admin], async (req, res, next)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given id does not exist');

    res.send(genre);
});


router.post('/api/genre', auth, async(req, res)=>{

  const genre = await Genre({name:req.body.name});

     genre.save((error)=>{
       if (error) handleError(error);
       console.log('Genre successfully added');
       //res.redirect('/');
     });
});


function handleError(err){
  for (field in err.errors){
    return console.log (err.errors[field].message);
  }
}

module.exports = router;
