const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // Replace with your desired port number

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes and middleware
// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});