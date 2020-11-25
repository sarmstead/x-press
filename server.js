const express = require('express');
const app = express();
const apiRouter = require('./api/api');

// Import middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

// Require middleware functions for every route
app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler());
app.use(morgan('dev'));


// Mount API router at all routes starting at /api
app.use('/api', apiRouter);

// Create PORT
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;