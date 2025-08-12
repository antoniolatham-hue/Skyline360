require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: "SkyLink360 API is running 🚀" });
});

// Example route for flight data
app.get('/flights', async (req, res) => {
  try {
    const flights = [
      { flight: "SK3601", status: "On Time" },
      { flight: "SK3602", status: "Delayed" }
    ];
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

app.listen(PORT, () => {
  console.log(`SkyLink360 server running on port ${PORT}`);
});

{
  "name": "skylink360-app",
  "version": "1.0.0",
  "description": "SkyLink360 App",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.8"
  }
}
