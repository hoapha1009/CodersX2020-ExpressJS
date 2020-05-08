const shortid = require("shortid");
var cloudinary = require('cloudinary').v2

var Book = require("../models/book.model");
var Session = require('../models/session.model');
var defaultCoverUrl = cloudinary.url('avatarCodersX/placeholder-book-cover-default_prhetk');


module.exports.index = async (req, res, next) => {
  // var a;
  var sessionId = req.signedCookies.sessionId;
  var books = await Book.find();
  var session = await Session.findById(sessionId);
  if(session)
    var cart = session.cart;
  var currentPage = req.query.page ? parseInt(req.query.page) : 1;
  var perPage = 10;
  var pageSize = Math.ceil(books.length / perPage );
  var begin = (currentPage - 1) * perPage;
  var end = currentPage * perPage;
  try {
      // a.b();
      res.render('./books', {
        books: books, 
        cart:cart,
        defaultCoverUrl: defaultCoverUrl,
        pageSize,
        currentPage,
        titleLink: "books"
      });
  } catch (error) {
    next(error);
  }
  
};

module.exports.getCreate = (req, res) => {
  res.render('./books/create');
};

module.exports.create = async (req, res) => {
  var file = req.file.path;
  var idBook = file.split("\\").pop();
  var rs = await cloudinary.uploader.upload(file, 
    { public_id: "avatarCodersX/uploads/" + idBook } );
  req.body.coverUrl = await cloudinary.url(rs.public_id);
  await Book.create(req.body);
  var success = "Thêm sách mới thành công!";
  res.render("./books/create", {
    success: success
  });
};

module.exports.updateTitle = (req, res) => {
  res.render("./books/update-title", {
    id: req.params.id
  });
};

module.exports.postupdateTitle = async (req, res) => {
  var idBook = req.body.id;
  await Book.findByIdAndUpdate(idBook, {title: req.body.title} );
  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;
  var book = await Book.findById(id);
  var coverurl = book.coverUrl.split("/").pop();
  await cloudinary.uploader.destroy("avatarCodersX/uploads/" + coverurl);
  await Book.findByIdAndRemove(id)
  res.redirect("back");
};