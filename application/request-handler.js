var express = require('express'),
    logger = require('./logger'),
    config = require('./config');
var router = express.Router();

var languages = {
    en: 'English',
    ru: 'Русский'
};

router.get('/', function (req, res) {
    res.redirect('/en/');
});

router.get('/:lng/:page?', function (req, res, next) {

    var lng = req.params['lng'],
        page = req.params['page'];

    //logger.debug({lng: lng, page: page, type_of_page: (typeof page)}, __filename + ':20');

    if (!languages.hasOwnProperty(lng)) {
        next('404');
    }

    if (typeof page == 'undefined') {
        res.render('index', {title: 'Hey', message: 'Hello there!'});
    }
    else {
        next('404');
    }
});

module.exports = router;