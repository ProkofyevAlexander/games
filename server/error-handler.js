var log = require('./logger');

module.exports = function (err, req, res, next) {
    if (err == '404') {
        res.status(404);
        res.render('index', {lng: 'en', is404: true});
        log.error({
            type: 'error',
            error_code: 404,
            ip: req.ip,
            url: req.originalUrl
        }, 'Page not found');
    }
    else {
        res.status(500);
    }
};