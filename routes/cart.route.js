const express = require("express");
const router = express.Router();
const controller = require('../controllers/cart.controller');
const countCookie = require('../middlewares/count-cookie.middleware');

router.get('/', controller.getCart);
router.get('/add/:book_id', controller.addToCart);
router.get('/rent', controller.rentCart);

module.exports = router;