var express = require('express'),
    vhost = require('vhost'),
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

var redirect = express();

redirect.use(function(req, res){
    res.redirect('http://'+ config.express.host + req.originalUrl);
});

var vhostApp = express();

vhostApp.use(vhost('*.' + config.express.host, redirect));
vhostApp.use(vhost(config.express.host, app));

module.exports = vhostApp;
