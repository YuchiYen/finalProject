const server = require("./server");
const mongoose = require('mongoose');

//const app = express();
const port = 3000; // Replace with your desired port number

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1/jscript-330-final', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes and middleware
// Example route
server.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});