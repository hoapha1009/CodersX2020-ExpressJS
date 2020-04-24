const express = require("express");
const router = express.Router();
const controller = require('../controllers/main.controller');
const countCookie = require('../middlewares/count-cookie.middleware');

router.get('/', countCookie.countCookie, controller.render);

module.exports = router;