const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const { initializeDatabase } = require('./db/db.connect');
const Book = require('./models/book.model');

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

app.get("/books", async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error){
        res.status(500).json({error: "Internal server error"});
    }
});

app.post("/books", async (req, res) => {
    const { bookName, author, genre } = req.body;
    try {
        const bookData = new Book({ bookName, author, genre });
        await bookData.save();
        res.status(201).json({message: 'Book added successfully.'})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.delete("/books/:id", async (req, res) => {
    const bookId = req. params.id;

    try{
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if(!deletedBook){
            return res.status(404).json({error: "Book not found"});
        }

        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})