const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require('../db');
const controller = require('../controllers/books.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render books index
router.get('/', controller.index);

// Update title
router.get('/:book_id/update', controller.updateTitle);

router.post("/update", controller.postupdateTitle);

//Delete
router.get("/:book_id/delete", controller.delete);

// Add new book
router.post("/", controller.create);

module.exports = router;