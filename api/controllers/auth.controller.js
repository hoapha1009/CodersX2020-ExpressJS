var User = require("../../models/user.model");

module.exports.postLogin = async (req, res) => {
    var users = await User.create(req.body);
    res.json(users);
};