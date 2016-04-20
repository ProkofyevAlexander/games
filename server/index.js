var express = require('express'),
    vhost = require('vhost'),
    config = require('./config'),
    accessLogger = require('./access-logger'),
    errorHandler = require('./error-handler'),
    socketHandler = require('./socket-handler');

var app = express();

//var server = require('http').createServer(app);
//var io = require('socket.io')(server);

//server.listen(8000);

//io.on('connection', socketHandler(io));

app.set('views', config.dir.view);
app.set('view engine', 'jade');

app.use(accessLogger);

var static_options = {
    "dotfiles": "ignore"
};

app.use('/socket.io/', express.static(config.dir.io, static_options));

app.use('/',
    express.static(config.dir.bower, static_options),
    express.static(config.dir.public, static_options)
);

app.use('/', require('./router-http'));

app.use(errorHandler);

var redirect = express();

redirect.use(function (req, res) {
    res.redirect('http://' + config.express.host + req.originalUrl);
});

var vhostApp = express();

vhostApp.use(vhost('*.fastvps-server.com', redirect));
vhostApp.use(vhost('fastvps-server.com', redirect));
vhostApp.use(vhost('*.' + config.express.host, redirect));
vhostApp.use(vhost(config.express.host, app));

module.exports = vhostApp;
