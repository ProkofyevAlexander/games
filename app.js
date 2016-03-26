'use strict';

var express = require('express'),
    config = require('./application/config'),
    logger = require('./application/logger'),
    access_logger = require('./application/access-logger'),
    request_handler = require('./application/request-handler'),
    error_handler = require('./application/error-handler');

var app = express();

app.set('views', config.viewDir());
app.set('view engine', 'jade');

app.use(access_logger);

var static_options = {
    "dotfiles": "ignore"
};

app.use('/',
    express.static(config.bowerDir(), static_options),
    express.static(config.publicDir(), static_options)
);

app.use('/', request_handler);

app.use(error_handler);

app.listen(config.serverPort(), function () {
    logger.info('Example app listening on port ' + config.serverPort() + '!');
});