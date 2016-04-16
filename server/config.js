var fs = require('fs'),
    path = require('path');

var config = module.exports;

config.express = {
    port: process.env.EXPRESS_PORT || 80,
    ip: '0.0.0.0',
    host: process.env.EXPRESS_HOST || 'games.dev'
};

var dir_base = path.join(__dirname, '..');

config.dir = {
    base: dir_base,
    log: path.join(dir_base, 'log'),
    view: path.join(dir_base, 'views'),
    bower: path.join(dir_base, 'bower_components'),
    public: path.join(dir_base, 'public')
};

// ensure log directory exists
fs.existsSync(config.dir.log) || fs.mkdirSync(config.dir.log);