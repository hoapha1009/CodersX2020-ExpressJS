const shortid = require("shortid");
// const md5 = require('md5');
const bcrypt = require("bcrypt");
var cloudinary = require('cloudinary').v2

const saltRounds = 10;
const db = require("../db");
var defaultAvatar = cloudinary.url('avatar-default-icon_fj1hm4');

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 10;
  var numberPage = Math.ceil(db.get('users').value().length / perPage );
  
  var start = (page - 1) * perPage;
  var end = page * perPage;

  res.render("./users/index", {
    users: db
      .get("users")
      .value()
      .slice(start, end),
    numberPage: numberPage,
    titleLink: "users",
    page: page,
    defaultAvatar: defaultAvatar
  });
};

module.exports.getCreate = (req, res) => {
  res.render('./users/create');
};

module.exports.postCreate = (req, res) => {
  // req.body.password = md5(req.body.password);
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    req.body.user_id = shortid.generate();
    req.body.password = hash;
    req.body.isAdmin = false;
    req.body.wrongLoginCount = 0;
    var file = req.file.path;
    var rs = await cloudinary.uploader.upload(file, 
      { public_id: "avatarCodersX/" + req.body.user_id } );
    req.body.avatar = cloudinary.url(rs.public_id);
    db.get("users")
      .push(req.body)
      .write();
    var success = "Tạo tài khoản thành công!";
    res.render("./users/create", {
      success: success
    });
  });
};

module.exports.changeName = (req, res) => {
  res.render("./users/change-name", {
    user_id: req.params.user_id
  });
};

module.exports.postChangeName = (req, res) => {
  db.get("users")
    .find({ user_id: req.body.user_id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
};

module.exports.delete = async (req, res) => {
  var user = db.get("users").find({ user_id: req.params.user_id }).value();
  await cloudinary.uploader.destroy("avatarCodersX/" + user.user_id);
  db.get("users")
    .remove({ user_id: req.params.user_id })
    .write();
  res.redirect("back");
};

module.exports.updateProfile = (req, res) => {
  bcrypt.hash(req.body.pasword, saltRounds, (err, hash) => {
    req.body.user = shortid.generate();
    req.body.isAdmin = false;
    req.body.password = hash;
    req.body.wrongLoginCount = 0;
    
    db.get('users')
      .push(req.body)
      .write();
    
    res.redirect('/users');
  });
};

module.exports.getProfile = (req, res) => {
  var idUser = req.params.user_id;
  var matchedUser = db.get('users').find({ user_id: idUser }).value();
  res.render('./users/profile', {
    user: matchedUser,
    defaultAvatar: defaultAvatar
  });
};

module.exports.postProfile = (req, res) => {
  var idUser = req.body.user_id;
  db.get('users')
    .find({ user_id: idUser })
    .assign({ name: req.body.name,
             avatar: req.body.avatar,
             email: req.body.email,
             avatar: req.body.avatar
            })
    .write();
  res.redirect('back');
};

module.exports.getChangeAvatar = (req, res) => {
  var idUser = req.params.user_id;
  var matchedUser = db.get('users').find({ user_id: idUser }).value();
  res.render('./users/update-avatar', {
    user: matchedUser,
    avatar: matchedUser.avatar || defaultAvatar
  });
};

module.exports.postChangeAvatar = async (req, res) => {
  var file = req.file.path;
  var matchedUser = db.get('users').find({ user_id: req.body.user_id }).value();
  var rs = await cloudinary.uploader.upload(file, { public_id: "avatarCodersX/" + req.body.user_id })
  var newAvatar = await cloudinary.url(rs.public_id);
  console.log(newAvatar);
  db.get('users')
    .find({ user_id: req.body.user_id })
    .assign({ avatar: newAvatar })
    .write();
  res.render('./users/update-avatar', {
    user: matchedUser,
    avatar: matchedUser.avatar || defaultAvatar
  });
};