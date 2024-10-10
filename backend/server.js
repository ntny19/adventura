const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./db');

const cors = require('cors');
app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/data', (req, res) => {
  db.query('SELECT cityname, cityavatar FROM city', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(200);
      res.json(results);  // Send the database results as JSON
  });
});
