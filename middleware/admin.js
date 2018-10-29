module.exports = function(req, res, next){
      if(!req.user.isAdmin) return res.status(403).send('Access denied');

    next(); //pass control to the next middleware function - which is the route hanlder
}
