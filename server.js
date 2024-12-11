const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db');
const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Enable CORS for requests from localhost:4200
app.use(cors({
  origin: 'http://localhost:4200'
}));
// Middlewares
app.use(bodyParser.json());

// Routes
const routes = require('./app/routes');
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
