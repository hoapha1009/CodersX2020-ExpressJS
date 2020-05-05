const shortid = require("shortid");
var cloudinary = require('cloudinary').v2

const db = require('../db');
var defaultCoverUrl = cloudinary.url('avatarCodersX/placeholder-book-cover-default_prhetk');
var Transaction = require('../models/transaction.model')
var Session = require('../models/session.model')
var Book = require('../models/book.model')

module.exports.addToCart = async(req, res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
    res.redirect('/books')
    return;
  }
  var session = await Session.findById(sessionId)
  if(session.cart.indexOf(bookId) === -1){
    session.cart.push(bookId)
    await Session.findByIdAndUpdate(sessionId,{cart: session.cart} )
  }
  res.redirect('/books');
};

module.exports.getCart = async(req, res) => {
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findById(sessionId);
  var books = await Book.find()
  res.render('cart/index',{
    cart : session.cart,
    books: books
  })
};

module.exports.rentCart = async(req, res) => {
  var sessionId = req.signedCookies.sessionId;
  var userId = res.locals.user.id;
  var session = await Session.findById(sessionId)
  if(session.cart){
    for( var item of session.cart){
      await Transaction.create({user_id: userId , book_id: item, isComplete: false})
    }
  }
  await Session.findByIdAndUpdate(sessionId, {cart: []})
  res.redirect('/transactions');
};

module.exports.deleteFromCart =async (req,res)=>{
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findById(sessionId);
  var index = session.cart.findIndex(item => item ===bookId) 
  session.cart.splice(index,1)
  await Session.findByIdAndUpdate(sessionId, {cart :session.cart })
  res.redirect('/cart')
};