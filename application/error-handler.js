var logger = require('./logger');

module.exports = function (err, req, res, next) {
    if (err == '404') {
        res.status(404);
        res.render('404');
        logger.error({
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