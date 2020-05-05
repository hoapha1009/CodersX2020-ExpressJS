const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    coverUrl: String
}, {
    versionKey: false 
});

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;
