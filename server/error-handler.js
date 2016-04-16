var log = require('./logger'),
    config = require('./config');

module.exports = function (err, req, res, next) {
    if (err == '404') {
        log.error({
            type: 'error',
            error_code: 404,
            ip: req.ip,
            url: req.originalUrl
        }, 'Page not found');
        
        res.status(404);
        res.render('index', {host: config.express.host, lng: 'en', is404: true}, function(err, html) {
            if (err) {
                log.error({
                    type: 'templateError',
                    error_description: err
                }, 'Template error');
                return res.send('404 - Page not found');
            }
            res.send(html);
        });
    }
    else {
        res.status(500);
        log.error({
            type: 'undefinedError',
            error_description: err
        }, 'Undefined error');
        res.send('Internal server error.');
    }
};