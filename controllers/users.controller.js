const shortid = require("shortid");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2
const User = require("../models/user.model");

const saltRounds = 10;
var defaultAvatar = cloudinary.url('avatar-default-icon_fj1hm4');

module.exports.index = async (req, res) => {
  var users = await User.find();
  res.render("./users/index", {
    users: users,
    defaultAvatar: defaultAvatar
  });
};

module.exports.getCreate = (req, res) => {
  res.render('./users/create');
};

module.exports.postCreate = async(req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    req.body.password = hash;
    req.body.isAdmin = false;
    req.body.wrongLoginCount = 0;
    var file = req.file.path;
    var avatarId = file.split("\\").slice(1).join("/");
    var rs = await cloudinary.uploader.upload(file, 
      { public_id: "avatarCodersX/" + avatarId } );
    req.body.avatar = await cloudinary.url(rs.public_id);
    User.create(req.body);
    var success = "Tạo tài khoản thành công!";
    res.render("./users/create", {
      success: success
    });
  });
};

module.exports.changeName = (req, res) => {
  res.render("./users/change-name", {
    id: req.params.id
  });
};

module.exports.postChangeName = async(req, res) => {
  var id = req.body.id;
  await User.findByIdAndUpdate(id, { name: req.body.name });
  res.redirect("/users");
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  var avatarurl = user.avatar.split("/").pop();
  await cloudinary.uploader.destroy("avatarCodersX/uploads/" + user.id);
  await User.findByIdAndRemove(id);
  res.redirect("back");
};

module.exports.getProfile = async(req, res) => {
  var idUser = req.params.id;
  var matchedUser = await User.findById(idUser);
  res.render('./users/profile', {
    user: matchedUser,
    defaultAvatar: defaultAvatar
  });
};

module.exports.postProfile = async(req, res) => {
  var idUser = req.body.id;
  await User.findByIdAndUpdate(idUser, {
    name: req.body.name,
    avatar: req.body.avatar,
    email: req.body.email
  });
  res.redirect('/users');
};

module.exports.getChangeAvatar = async(req, res) => {
  var idUser = req.params.id;
  var matchedUser = await User.findById(idUser);
  res.render('./users/update-avatar', {
    user: matchedUser,
    avatar: matchedUser.avatar || defaultAvatar
  });
};

module.exports.postChangeAvatar = async (req, res) => {
  var file = req.file.path;
  var avatarUrl = file.split("\\").pop();
  var idUser = req.body.id;
  var matchedUser = await User.findById(idUser);
  var rs = await cloudinary.uploader.upload(file, { public_id: "avatarCodersX/uploads/" + avatarUrl })
  var newAvatar = await cloudinary.url(rs.public_id);
  await User.findByIdAndUpdate(idUser, { avatar: newAvatar });
  res.redirect(`/users/${idUser}/update-avatar`);
};