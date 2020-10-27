
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const morgan = require('morgan');

module.exports = [
    function(req, res, next) {
        bodyParser.json();
    },
    function(req, res, next) {
        cors();
    },
    function(req, res, next) {
        errorHandler();
    },
    function(req, res, next) {
        morgan('dev');
    }
];