const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require("../db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render transaction web
router.get("/", (req, res) => {
  res.render("./transactions/index", {
    transactions: db.get("transactions").value()
  });
});

// Add new user
router.post("/", (req, res) => {
  req.body.trans_id = shortid.generate();

  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
});

// Delete trans
router.get("/:trans_id/delete", (req, res) => {
  db.get("transactions")
    .remove({ trans_id: req.params.trans_id })
    .write();
  res.redirect("back");
});

// Create new transaction
router.get("/create", (req, res) => {
  res.render("./transactions/create", {
    transactions: db.get("transactions").value()
  });
});

router.post("/create", (req, res) => {
  req.body.trans_id = shortid.generate();

  db.get("transactions")
    .push(req.body)
    .write();

  res.redirect("/transactions");
});

module.exports = router;
