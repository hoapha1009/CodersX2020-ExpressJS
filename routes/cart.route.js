const express = require("express");
const router = express.Router();
const controller = require('../controllers/cart.controller');

router.get('/', controller.getCart);
router.get('/add/:bookId', controller.addToCart);
router.get('/delete/:bookId', controller.deleteFromCart);
router.get('/rent', controller.rentCart);


module.exports = router;