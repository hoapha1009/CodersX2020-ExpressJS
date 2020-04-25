const shortid = require("shortid");
const db = require('../db');
const md5 = require('md5');

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
  var errors = [];
  var user = db.get('users').find({email: email}).value();
  if (!user) {
    errors.push('User does not exist.')
    return res.render('auth/login', {
      errors: errors,
      values: req.body,
    });
  }
  
  var hashedPass = md5(password);
  if (user.password !== hashedPass) {
    errors.push('Wrong password.')
    return res.render('auth/login', {
      errors: errors,
      values: req.body,
    });
  }
  
  res.cookie('userId', user.user_id);
  res.redirect('/');
};