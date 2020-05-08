const User = require("../models/user.model");

module.exports.requireMainAuth = (req, res, next) => {
  var userId = User.findById(req.cookies.userId);
  if(userId.isAdmin == true){
    res.locals.isAdmin = true;
  }
  next();
}; 
