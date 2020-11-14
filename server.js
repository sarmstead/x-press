const express = require('express');
const app = express();
const apiRouter = require('./api/api');

// Require middleware functions for every route
app.use(require('./middleware'));

// Mount API router at all routes starting at /api
app.use('/api', apiRouter);

// Create PORT
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;