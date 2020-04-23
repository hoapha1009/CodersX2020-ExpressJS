const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require("../db");
const controller = require('../controllers/transactions.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render transaction web
router.get("/", controller.index);

// Delete trans
router.get("/:trans_id/delete", controller.delete);

// Create new transaction
router.get("/create", controller.create);

router.post("/create", (req, res) => {
  req.body.trans_id = shortid.generate();

  db.get("transactions")
    .push(req.body)
    .write();

  res.redirect("/transactions");
});

module.exports = router;
