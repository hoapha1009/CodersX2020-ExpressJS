const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const controller = require('../controllers/auth.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get("/logout", controller.logout);

module.exports = router;