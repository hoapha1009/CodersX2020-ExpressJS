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

router.post("/create", controller.postCreate);

// Give book back
router.get("/:trans_id/complete", controller.isComplete);

module.exports = router;
