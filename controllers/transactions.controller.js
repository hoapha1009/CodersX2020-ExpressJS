const shortid = require("shortid");

const Transaction = require("../models/transaction.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");


module.exports.index = async(req, res) => {
  if (res.locals.isAdmin) {
    let transactions = await Transaction.find()
    res.render("transactions/index", {
      transactions: transactions
    });
    return;
  }
  let id = req.signedCookies.userId
  let transactionFilterById = await Transaction.find({user_id: id})
  res.render("transactions/index", {
    transactions: transactionFilterById
  });
};

module.exports.create = async (req, res) => {
  let result = await Promise.all([User.find(), Book.find(), Transaction.find()]);
  res.render("./transactions/create", {
    transactions: result[2],
    users: result[0],
    books: result[1]
  });
};

module.exports.postCreate = async(req, res) => {
  req.body.isComplete = false;
  await Transaction.create(req.body);
  res.redirect("/transactions");
};

module.exports.delete = async (req, res) => {
  var idTrans = req.params.id;
  await Transaction.findByIdAndRemove(idTrans);
  res.redirect("back");
};

module.exports.isComplete = async (req, res) => {
  var idTransaction = req.params.id;
  await Transaction.findByIdAndUpdate(idTransaction, { isComplete: true });
  res.redirect('/transactions');
};