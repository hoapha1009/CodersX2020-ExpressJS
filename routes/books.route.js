const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");
const multer = require("multer");

const db = require('../db');
const controller = require('../controllers/books.controller');
const countCookie = require('../middlewares/count-cookie.middleware');
var upload = multer({ dest: './public/uploads/' });

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
router.get("/create", controller.getCreate);
router.post("/create", upload.single('coverUrl'), controller.create);

module.exports = router;