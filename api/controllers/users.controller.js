const User = require("../../models/user.model");

module.exports.getAll = async (req, res) => {
    let users = await User.find()
    res.json(users)
}
module.exports.getOne = async (req, res) => {
    let users = await User.findById(req.params.id)
    res.json(users)
}
module.exports.postCreate = async (req, res) => {
    let users = await User.create(req.body);
    res.json(users)
}
module.exports.putUpdate = async (req, res) => {
    let users = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(users)
}
module.exports.patchUpdateOne = async (req, res) => {
    let users = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(users)
}
module.exports.deleteId = async (req, res) => {
    let users = await User.findByIdAndRemove(req.params.id);
    res.json(users)
}