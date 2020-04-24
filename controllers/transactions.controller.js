const shortid = require("shortid");

const db = require('../db');

module.exports.index = (req, res) => {
  res.render("./transactions/index", {
    transactions: db.get("transactions").value()
  });
};

module.exports.create = (req, res) => {
  res.render("./transactions/create", {
    transactions: db.get("transactions").value(),
    users: db.get("users").value(),
    books: db.get("books").value()
  });
};

module.exports.postCreate = (req, res) => {
  req.body.trans_id = shortid.generate();
  req.body.isComplete = false;
  
  db.get("transactions")
    .push(req.body)
    .write();

  res.redirect("/transactions");
};

module.exports.delete = (req, res) => {
  db.get("transactions")
    .remove({ trans_id: req.params.trans_id })
    .write();
  res.redirect("back");
};

module.exports.isComplete = (req, res) => {
  db.get('transactions')
    .find({ trans_id: req.params.trans_id })
    .assign( { isComplete: true } )
    .write();
  res.redirect('/transactions');
};