const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for frontend requests
app.use(cors());

// Serve employee data from the JSON file
app.get('/api/employees', (req, res) => {
  const filePath = path.join(__dirname, 'employees.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading employee data" });
      return;
    }
    const employees = JSON.parse(data);
    res.json(employees);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
