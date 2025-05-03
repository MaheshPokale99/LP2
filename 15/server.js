const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors')

const app = express();
const PORT = 3000;

app.use(cors())

// Middleware to serve static files like images
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
  // Read the products.json file
  fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading product data' });
    } else {
      res.json(JSON.parse(data)); // Return parsed JSON data
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
