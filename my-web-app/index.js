const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
