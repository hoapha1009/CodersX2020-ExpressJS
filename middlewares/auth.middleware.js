const db = require('../db');
var User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('./auth/login');
    return;
  }
  
  var userId = req.signedCookies.userId;
  var user = await User.findById(userId);
  
  if(!user) {
    res.redirect('./auth/login');
    return;
  }  
  
  if(user.isAdmin) {
    res.locals.isAdmin = true;
  }
  next();
}; 


