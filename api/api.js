const express = require('express');
const app = require('../server');
const apiRouter = express.Router();
const artistsRouter = require('./artists');

app.use('/artists', artistsRouter);

module.exports = apiRouter;