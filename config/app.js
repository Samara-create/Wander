const express = require('express');
const app = express();

// Middleware and routes setup
app.use(express.json());
// Add your routes here

module.exports = app;