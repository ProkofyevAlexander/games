var express = require('express'),
    config = require('./config'),
    access_logger = require('./access-logger'),
    error_handler = require('./error-handler');

var app = express();

app.set('views', config.dir.view);
app.set('view engine', 'jade');

app.use(access_logger);

var static_options = {
    "dotfiles": "ignore"
};

app.use('/',
    express.static(config.dir.bower, static_options),
    express.static(config.dir.public, static_options)
);

app.use('/', require('./router-http'));

app.use(error_handler);

module.exports = app;
