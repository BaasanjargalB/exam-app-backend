const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db');

// Enable CORS for requests from localhost:4200
app.use(cors({
  origin: 'http://localhost:4200'
}));
// Middlewares
app.use(bodyParser.text());

// Routes
const routes = require('./app/routes');
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
