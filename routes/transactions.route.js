const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");

const db = require("../db");
const controller = require('../controllers/transactions.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render transaction web
router.get("/", authMiddleware.requireAuth, controller.index);

// Delete trans
router.get("/:id/delete", adminMiddleware, controller.delete);

// Create new transaction
router.get("/create", adminMiddleware, controller.create);

router.post("/create", adminMiddleware, controller.postCreate);

// Give book back
router.get("/:id/complete", controller.isComplete);

module.exports = router;
