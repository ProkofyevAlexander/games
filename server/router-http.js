var express = require('express'),
    config = require('./config');
var router = express.Router();

var languages = {
    en: 'English',
    ru: 'Русский'
};

var mainHttpHandler = function (req, res, next) {

    var lng = req.params['lng'];

    if (!languages.hasOwnProperty(lng)) {
        return next('404');
    }

    // Setup page content by AngularJS
    res.render('index', {lng: lng});

};

// AngularJS components
router.get('/components/*', function (req, res, next) {

    res.render('.' + req.originalUrl, {}, function(err, html) {
        if (err) {
            return next('404');
        }
        res.send(html);
    });
});

router.get('/404', function (req, res) {

    res.render('404');
});

router.get('/', function (req, res) {

    res.redirect('/en/');
});

router.get('/:lng', mainHttpHandler);
router.get('/:lng/*', mainHttpHandler);

module.exports = router;