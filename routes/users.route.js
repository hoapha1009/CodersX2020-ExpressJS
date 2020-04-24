const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require('../db');
const controller = require('../controllers/users.controller');
const validate = require('../validate/user.validate.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render user web
router.get('/', controller.index);

// Add new user
router.post('/', validate.create, controller.create);

// Change username
router.get('/:user_id/changename', controller.changeName);
router.post('/changename', controller.postChangeName);

// Delete user
router.get('/:user_id/delete', controller.delete);

module.exports = router;