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
            next('404');
        }
        res.send(html);
    });
});

router.get('/', function (req, res) {

    res.redirect('/en/');
});

router.get('/:lng/:page?', function (req, res, next) {

    var lng = req.params['lng'],
        page = req.params['page'];

    if (!languages.hasOwnProperty(lng)) {
        next('404');
    }

    // Setup page content by AngularJS
    res.render('index', {lng_init: "lng='" + lng + "'"});

    /*if (typeof page == 'undefined') {
        res.render('index', {lng: lng});
    }
    else {
        next('404');
    }*/
});

module.exports = router;