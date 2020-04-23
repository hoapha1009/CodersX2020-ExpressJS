const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require('../db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render books index
router.get('/', (req, res) => {
  res.render('./books', {
    books: db.get('books').value()
  });
});

// Update title
router.get('/:book_id/update', (req, res) => {
  res.render("./books/update-title", {
    book_id: req.params.book_id
  });
});

router.post("/update", (req, res) => {
  db.get("books")
    .find({ book_id: req.body.book_id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

//Delete
router.get("/:book_id/delete", (req, res) => {
  var book_id = req.params.book_id;
  db.get("books")
    .remove({ book_id: book_id })
    .write();
  res.redirect("back");
});

// Add new book
router.post("/", (req, res) => {
  req.body.book_id = shortid.generate();
  console.log(req.body.book_id);
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
});

module.exports = router;