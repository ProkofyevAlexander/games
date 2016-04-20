var express = require('express'),
    config = require('./config'),
    log = require('./logger');
var router = express.Router();

var languages = {
    en: 'English',
    ru: 'Русский'
};

var baseUrl = 'http://' + config.express.host +
    (config.express.port == 80 ? '' : ':' + config.express.port);

var mainHttpHandler = function (req, res, next) {

    var lng = req.params['lng'];

    if (!languages.hasOwnProperty(lng)) {
        return next('404');
    }

    // Setup page content by AngularJS
    res.render('index', {baseUrl: baseUrl, lng: lng}, function(err, html) {
        if (err) {
            log.error({
                type: 'templateError',
                error_description: err
            }, 'Template error');
            return next('404');
        }
        res.send(html);
    });

};

// AngularJS components
router.get('/components/*', function (req, res, next) {

    var template = req.originalUrl.replace('/components/', 'components/');

    res.render(template, {baseUrl: baseUrl}, function(err, html) {
        if (err) {
            log.error({
                type: 'templateError',
                error_description: err
            }, 'Template error');
            return next('404');
        }
        res.send(html);
    });
});

router.get('/404', function (req, res) {

    res.render('404', {baseUrl: baseUrl}, function(err, html) {
        if (err) {
            log.error({
                type: 'templateError',
                error_description: err
            }, 'Template error');
            return res.send('404 - Page not found');
        }
        res.send(html);
    });
});

router.get('/', function (req, res) {

    res.redirect('/en/');
});

router.get('/:lng', mainHttpHandler);
router.get('/:lng/*', mainHttpHandler);

module.exports = router;