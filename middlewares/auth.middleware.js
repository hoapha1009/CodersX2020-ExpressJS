const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  if(!req.cookies.userId) {
    res.redirect('./auth/login');
    return;
  }
  
  var userId = req.cookies.userId;
  var user = db.get('users').find({ user_id: userId }).value();
  
  if(!user) {
    res.redirect('./auth/login');
    return;
  }  
  
  if(user.isAdmin) {
    res.locals.isAdmin = true;
  }
  
  next();
}; 


