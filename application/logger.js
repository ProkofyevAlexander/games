var fs = require('fs'),
    fileStreamRotator = require('file-stream-rotator'),
    bunyan = require('bunyan'),
    config = require('./config');

var error_log_stream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: config.logDir() + '/error-%DATE%.log',
    frequency: 'daily',
    verbose: false
});

var debug_log_stream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: config.logDir() + '/debug-%DATE%.log',
    frequency: 'daily',
    verbose: false
});

module.exports = bunyan.createLogger({
    name: "games",
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: error_log_stream
        },
        {
            level: 'debug',
            stream: debug_log_stream
        }
    ]
});