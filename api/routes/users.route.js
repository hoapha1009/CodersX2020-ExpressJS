const express = require("express");
const router = express.Router();

const controller = require('../controllers/users.controller');

router.get("/", controller.getAll);
router.post("/", controller.postCreate);
router.get("/:id", controller.getOne);
router.put("/:id", controller.putUpdate)
router.patch("/:id", controller.patchUpdateOne)
router.delete("/:id", controller.deleteId);

module.exports = router;