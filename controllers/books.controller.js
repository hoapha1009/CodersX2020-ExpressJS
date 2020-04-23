const shortid = require("shortid");

const db = require('../db');

module.exports.index = (req, res) => {
  res.render('./books', {
    books: db.get('books').value()
  });
};

module.exports.create = (req, res) => {
  req.body.book_id = shortid.generate();
  console.log(req.body.book_id);
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
};

module.exports.updateTitle = (req, res) => {
  res.render("./books/update-title", {
    book_id: req.params.book_id
  });
};

module.exports.postupdateTitle = (req, res) => {
  db.get("books")
    .find({ book_id: req.body.book_id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
};

module.exports.delete = (req, res) => {
  var book_id = req.params.book_id;
  db.get("books")
    .remove({ book_id: book_id })
    .write();
  res.redirect("back");
};