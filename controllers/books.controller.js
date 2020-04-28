const shortid = require("shortid");

const db = require('../db');


module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 10;
  var numberPage = Math.ceil(db.get('books').value().length / perPage );
  
// C1: Dùng slice
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
// C2: Dùng Lodash 
  var drop = (page - 1) * perPage;
  
  res.render('./books', {
    // books: db.get('books').value().slice(start, end) //C1
    
    books: db.get('books').drop(drop).take(perPage).value(), //C2
    numberPage: numberPage,
    titleLink: "books",
    page: page+1
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