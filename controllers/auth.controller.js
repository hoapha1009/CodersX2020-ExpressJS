const shortid = require("shortid");
const db = require('../db');

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const errors = [];
  const user = db.get('users').find({email: email}).value();
  if (!user) {
    errors.push('User does not exist.')
    return res.render('auth/login', {
      errors: errors,
      values: req.body,
    });
  }
  
  if (user.password !== password) {
    errors.push('Wrong password.')
    return res.render('auth/login', {
      errors: errors,
      values: req.body,
    });
  }
  
  res.cookie('userId', user.user_id);
  res.redirect('/');
};