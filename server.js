const express = require('express');
const app = express();

// Require middleware functions for every route
app.use(require('./middleware'));

// Create PORT
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;