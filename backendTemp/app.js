require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/User.routes");
const cors = require('cors');
const expressLayout = require("express-ejs-layouts");
const http = require('http');
const path = require('path');

// Create the Express application
const app = express();
app.use(express.json());

// Set the port
const PORT = 5000 ||process.env.PORT;

// MongoDB URI
const MONGODB_URI = process.env.URI_MONGO;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error('Could not connect to MongoDB..', err));

app.use(express.static('public'));
app.use(cookieParser());

// Set up CORS options
const corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Include before defining your routes

// Set up Express layouts and view engine
app.use(expressLayout);
app.set("layout", './layout/main');
app.set('view engine', "ejs");

// Use routes
app.use("/api", UserRoutes);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
