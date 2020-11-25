const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });
const sqlite3 = require('sqlite3');
db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


issuesRouter.get('/', (req, res, next) {
    
});

module.exports = issuesRouter;