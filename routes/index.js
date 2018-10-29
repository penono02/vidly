const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  console.log(req.headers.host);

  res.render('index');
});

router.get('/login', (req, res)=>{
  res.render('auth');
});


module.exports = router;
