const db = require('../db');

module.exports.create = (req, res, next) => {
  var username = req.body.name;
  if( username.length > 30 ){
    var error = "Password không được dài quá 30 ký tự!";
  }
  if(error){
    res.render('./users/index', {
      users: db.get('users').value(),
      error: error
    });
    return;
  }
  next();
};