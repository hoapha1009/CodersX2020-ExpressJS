const User = require("../models/user.model");

module.exports.render = (req, res) => {
  var user_id = req.signedCookies.userId;
  var user = User.findById(user_id);
  res.render('./index', {
    user: user
  });
};

