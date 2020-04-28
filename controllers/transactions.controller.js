const shortid = require("shortid");

const db = require('../db');

module.exports.index = (req, res) => {
  var userId = req.signedCookies.userId;
  console.log(userId);
  var numberPage = Math.ceil(db.get('transactions').value().length / perPage);
  var perPage = 10;
  var page = req.query.page;
  
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  var transactions = db.get('transactions').value().filter(tran => {
    return tran.user_id === userId;
  });
  res.render("./transactions/index", {
    transactions: transactions,
    numberPage: numberPage,
    titleLink: "transactions",
    page: page
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
  var trans_id = req.params.trans_id;
  var trans = db.get('transactions')
                .value();
  var matchedTrans = trans.filter(tran => tran.trans_id.indexOf(trans_id) !== -1);
  if(matchedTrans.length) {
    db.get('transactions')
      .find({ trans_id: trans_id })
      .assign( { isComplete: true } )
      .write();
    res.redirect('/transactions');
  }
  else {
    res.redirect('/transactions');
    return;
  }
};