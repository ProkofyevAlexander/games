var fs = require('fs'),
    path = require('path'),
    morgan = require('morgan'),
    fileStreamRotator = require('file-stream-rotator'),
    config = require('./config');

// create a rotating write stream
var access_log_stream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(config.dir.log, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

module.exports = morgan('combined', {stream: access_log_stream});