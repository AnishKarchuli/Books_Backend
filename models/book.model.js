const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName: String,
    author: String,
    genre: String,
});

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;