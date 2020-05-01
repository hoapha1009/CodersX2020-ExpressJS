const shortid = require("shortid");
var cloudinary = require('cloudinary').v2

const db = require('../db');
var defaultCoverUrl = cloudinary.url('avatarCodersX/placeholder-book-cover-default_prhetk');

module.exports.addToCart = (req, res) => {
  var bookId = req.params.book_id;
  var sessionId = req.signedCookies.sessionId;
  
  if(!sessionId) {
    res.redirect('/books');
    return;
  }
  
  var count = db.get('sessions')
                .find({ id: sessionId })
                .get('cart.' + bookId, 0)
                .value();
  
  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + bookId, count + 1)
    .write();
  
  res.redirect('/books');
};

module.exports.getCart = (req, res) => {
  var sessionId = req.signedCookies.sessionId;
  var sessions = db.get('sessions')
                   .find({ id: sessionId })
                   .value();
  
  var cart = [];
  var coverBook = [];
  var titleBook = [];
  
  var numberBook = Object.values(sessions.cart);
  var idBook = Object.keys(sessions.cart);
  
  for(var id of idBook) {
    var infoBook = db.get('books')
                     .find({ book_id: id })
                     .value();
    coverBook.push(infoBook.coverUrl);
    titleBook.push(infoBook.title);
  }
  
  for(var i = 0; i < idBook.length; i++){
      cart.push(JSON.parse('{"book_id":"' + idBook[i]
                           + '", "number":' + numberBook[i]
                           + ', "bookCover":"' + coverBook[i]
                           + '", "titleBook":"' + titleBook[i]
                           + '"}'));
  }
  
  res.render('./cart/index', {
    arrCart: cart,
    defaultCoverUrl: defaultCoverUrl
  });
};

module.exports.rentCart = (req, res) => {
  var sessionId = req.signedCookies.sessionId;
  var user_id = req.signedCookies.userId;
  var user = db.get('users')
               .find({ user_id: user_id })
               .value();
  var sessions = db.get('sessions')
                   .find({ id: sessionId })
                   .value();
  
  var idBook = Object.keys(sessions.cart);
  
  for(var id of idBook) {
    var data = {
      trans_id: shortid.generate(),
      book_id: id,
      user_id: user_id,
      "isComplete": false
    };
    if(!user) {
      res.redirect('/auth/login');
      return;
    }
    else {
      if(user.isAdmin !== true){
        db.get('transactions')
        .push(data)
        .write();
      }
    }
  }
  
  res.redirect('/cart');
}