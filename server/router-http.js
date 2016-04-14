var express = require('express'),
    config = require('./config');
var router = express.Router();

var languages = {
    en: 'English',
    ru: 'Русский'
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

router.get('/:lng/:page?', function (req, res, next) {

    var lng = req.params['lng'],
        page = req.params['page'];

    if (!languages.hasOwnProperty(lng)) {
        return next('404');
    }

    // Setup page content by AngularJS
    res.render('index', {lng: lng});
    
});

module.exports = router;