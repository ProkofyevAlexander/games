var fs = require('fs'),
    path = require('path');

var base_dir = path.normalize(__dirname + '/..');

var logDir = function () {
    return base_dir + '/log';
};

exports.serverPort = function () {

    return typeof process.env.npm_package_config_port != 'undefined'
        ? process.env.npm_package_config_port
        : 8080;
};

exports.baseDir = function () {
    return base_dir;
};

exports.logDir = logDir;

exports.viewDir = function () {
    return base_dir + '/views';
};

exports.bowerDir = function () {
    return base_dir + '/bower_components';
};

exports.publicDir = function () {
    return base_dir + '/public';
};

// ensure logger directory exists
fs.existsSync(logDir()) || fs.mkdirSync(logDir());