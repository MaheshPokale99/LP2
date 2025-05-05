const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Book = require("./models/Book");
const booksData = require("./booksData");

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: "*" }));

app.use(express.json()); // VERY IMPORTANT

// MongoDB connection
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookstore");
    console.log("Connected to MongoDB");

    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      await Book.insertMany(booksData);
      console.log("Sample book data inserted");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

// API Routes
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: "Error retrieving books", details: err.message });
  }
});

app.post("/books", async (req, res) => {
  const { title, author, price, genre } = req.body;
  try {
    const newBook = new Book({ title, author, price, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: "Error adding book", details: err.message });
  }
});

app.put("/books/:id", async (req, res) => {
  const { title, author, price, genre } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, genre },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: "Error updating book", details: err.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting book", details: err.message });
  }
});

const startServer = () => {
  connectToDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
