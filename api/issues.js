const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });
const sqlite3 = require('sqlite3');
db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.param('issueId', (req, res, next, issuesId) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.id = $issueId';
    const values = {
        $issueId: issueId
    };
    db.get(sql, values, (err, issue) => {
        if (err) {
            next(err);
        } else if (issue) {
            next();
        } else {
            res.sendStatus(400);
        }
    });
});

issuesRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM Issue WHERE Issue.series_id = $seriesId';
    const values = {
        $seriesId: req.params.seriesId
    };
    db.all(sql, values, (err, issues) => {
        if (err) {
            next(err);
        }
        res.status(200).json({issues: issues});
    });
});

issuesRouter.post('/', (req, res, next) => {
    const name = req.body.issue.name;
    const issueNumber = req.body.issue.issueNumber;
    const publicationDate = req.body.issue.publicationDate;
    const artistId = req.body.issue.artistId;

    const artistSql = 'SELECT * FROM Artist WHERE Artist.id = $artistId';
    const artistValues = {
        $artistId: artistId
    }

    db.get(artistSql, artistValues, (err, artist) => {
        if (err) {
            next(err);
        } else {
            if (!name || !issueNumber || !publicationDate || !artistId) {
                return res.sendStatus(400);
            }
            const issueSql = 'INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)';
            const issueValues = {
                $name: name,
                $issueNumber: issueNumber,
                $publicationDate: publicationDate,
                $artistId: artistId,
                $seriesId: req.params.seriesId
            };
            db.run(issueSql, issueValues, function(err) {
                if (err) {
                    next(err);
                }
                db.get(`SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`, (err2, issue) => {
                    res.status(201).json({issue: issue});
                });
            });
        }
    });

    

   
});

module.exports = issuesRouter;