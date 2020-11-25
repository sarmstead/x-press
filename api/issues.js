const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });
const sqlite3 = require('sqlite3');
db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');


issuesRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.series_id = $seriesId';
    const values = {
        $seriesId: req.params.seriesId
    }
    db.all(sql, values, (err, issues) => {
        if (err) {
            next(err);
        }
        res.status(200).json({issues: issues})
    });
});

module.exports = issuesRouter;