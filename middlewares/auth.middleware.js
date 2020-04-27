const db = require('../db');

module.exports.requireAuth = (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('./auth/login');
    return;
  }
  
  var userId = req.signedCookies.userId;
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


