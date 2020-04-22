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
router.get('/:id/update', (req, res) => {
  res.render("./books/update-title", {
    id: req.params.id
  });
});

router.post("/update", (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

//Delete
router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("back");
});

// Add new book
router.post("/", (req, res) => {
  req.body.id = shortid.generate();
  console.log(req.body.id);
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
});

module.exports = router;