const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const shortid = require("shortid");
var multer  = require('multer');

const db = require("../db");
const controller = require("../controllers/users.controller");
const validate = require("../validate/user.validate.js");
const countCookie = require("../middlewares/count-cookie.middleware");
var upload = multer({ dest: './public/uploads/' });


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Render user web
router.get(
  "/",
  countCookie.countCookie,
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
  "/:user_id/changename",
  countCookie.countCookie,
  controller.changeName
);
router.post("/changename", controller.postChangeName);

// Delete user
router.get("/:user_id/delete", controller.delete);

//Update user
router.get("/update-profile", controller.updateProfile);

//Profile
router.get('/:user_id/profile', controller.getProfile);
router.post('/profile', upload.single('avatar'), controller.postProfile);

//Change avatar
router.get('/:user_id/update-avatar', controller.getChangeAvatar);
router.post('/update-avatar', upload.single('avatar'), controller.postChangeAvatar);

module.exports = router;
