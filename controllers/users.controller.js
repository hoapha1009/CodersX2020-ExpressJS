const shortid = require("shortid");

const db = require('../db');

module.exports.index = (req, res) => {
  res.render('./users/index', {
    users: db.get('users').value()
  });
};

module.exports.create = (req, res) => {
  req.body.user_id = shortid.generate();
  
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('back');
};

module.exports.changeName = (req, res) => {
  res.render('./users/change-name', {
    user_id: req.params.user_id
  });
};

module.exports.postChangeName = (req, res) => {
  db.get('users')
    .find({ user_id: req.body.user_id })
    .assign({ name: req.body.name })
    .write();
  res.redirect('/users');
};

module.exports.delete = (req, res) => {
  db.get('users')
    .remove({ user_id: req.params.user_id })
    .write();
  res.redirect('back');
};