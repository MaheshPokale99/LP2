const mongoose=require("mongoose");
const express=require("express");
const Book=require("./models/Book");


const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// MongoDB connection
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

// Add a new book
app.post('/books', async (req, res) => {
  const { title, author, price, genre } = req.body;

  try {
    const newBook = new Book({ title, author, price, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: 'Error adding book', details: err.message });
  }
});

// Retrieve a list of all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: 'Error retrieving books', details: err.message });
  }
});

// Update book details
app.put('/books/:id', async (req, res) => {
  const { title, author, price, genre } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price, genre },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: 'Error updating book', details: err.message });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting book', details: err.message });
  }
});

// Start the server
const startServer = () => {
  connectToDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
