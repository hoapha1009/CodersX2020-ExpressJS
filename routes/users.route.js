const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");
var multer  = require('multer');

const db = require("../db");
const controller = require("../controllers/users.controller");
const validate = require("../validate/user.validate.js");
var upload = multer({ dest: './public/uploads/' });


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render user web
router.get(
  "/",
  controller.index
);

// Add new user
router.get("/create", controller.getCreate);
router.post("/create",
            upload.single('avatar'), 
            validate.create,
            controller.postCreate
);

// Change username
router.get(
  "/:id/changename",
  controller.changeName
);
router.post("/changename", controller.postChangeName);

// Delete user
router.get("/:id/delete", controller.delete);

//Profile
router.get('/:id/profile', controller.getProfile);
router.post('/profile', upload.single('avatar'), controller.postProfile);

//Change avatar
router.get('/:id/update-avatar', controller.getChangeAvatar);
router.post('/update-avatar', upload.single('avatar'), controller.postChangeAvatar);

module.exports = router;
