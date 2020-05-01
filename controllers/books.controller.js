const shortid = require("shortid");
var cloudinary = require('cloudinary').v2

const db = require('../db');
var defaultCoverUrl = cloudinary.url('avatarCodersX/placeholder-book-cover-default_prhetk');


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
    page: page,
    defaultCoverUrl: defaultCoverUrl
  });
};

module.exports.getCreate = (req, res) => {
  res.render('./books/create');
};

module.exports.create = async (req, res) => {
  req.body.book_id = shortid.generate();
  var file = req.file.path;
  var rs = await cloudinary.uploader.upload(file, 
      { public_id: "avatarCodersX/" + req.body.book_id } );
  req.body.coverUrl = cloudinary.url(rs.public_id);
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

module.exports.delete = async (req, res) => {
  var book_id = req.params.book_id;
  await cloudinary.uploader.destroy("avatarCodersX/" + book_id);
  db.get("books")
    .remove({ book_id: book_id })
    .write();
  res.redirect("back");
};