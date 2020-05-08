const Book = require("../../models/book.model");

module.exports.getAll = async (req, res) => {
    let books = await Book.find()
    res.json(books)
}
module.exports.getOne = async (req, res) => {
    let books = await Book.findById(req.params.id)
    res.json(books)
}
module.exports.postCreate = async (req, res) => {
    let books = await Book.create(req.body);
    res.json(books)
}
module.exports.putUpdate = async (req, res) => {
    let books = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json(books)
}
module.exports.patchUpdateOne = async (req, res) => {
    let books = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.json(books)
}
module.exports.deleteId = async (req, res) => {
    let books = await Book.findByIdAndRemove(req.params.id);
    res.json(books)
}