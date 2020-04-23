const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require('../db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render user web
router.get('/', (req, res) => {
  res.render('./users/index', {
    users: db.get('users').value()
  });
});

// Add new user
router.post('/', (req, res) => {
  req.body.user_id = shortid.generate();
  
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('back');
})

// Change username
router.get('/:user_id/changename', (req, res) => {
  res.render('./users/change-name', {
    user_id: req.params.user_id
  });
});
router.post('/changename', (req, res) => {
  db.get('users')
    .find({ user_id: req.body.user_id })
    .assign({ name: req.body.name })
    .write();
  res.redirect('/users');
});

// Delete user
router.get('/:user_id/delete', (req, res) => {
  db.get('users')
    .remove({ user_id: req.params.user_id })
    .write();
  res.redirect('back');
});

module.exports = router;