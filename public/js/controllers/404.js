define(['app'], function (app) {

    var lazyLoad = function ($poContainer) {

        var lstrSource = $poContainer.attr('data-src');
        var lstrPosition = $poContainer.attr('data-position');

        $('<img>').attr('src', lstrSource).load(function () {
            $poContainer.css('background-image', 'url("' + lstrSource + '")');
            $poContainer.css('background-position', lstrPosition);
            $poContainer.css('-ms-filter', '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\')"');
            $poContainer.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\'');
        });
    };

    var cssDelayFix = function () {

        var $window = $(window);
        var fixCssDelayWatchDog = 0;

        var fixCssDelay = setInterval(function () {

            $window.trigger('resize');

            fixCssDelayWatchDog++;

            if (fixCssDelayWatchDog > 15) {
                clearInterval(fixCssDelay);
            }
        }, 50);
    };

    var initPage = function () {

        var $jumbotron = $('.jumbotron');

        $jumbotron.css({height: ($(window).height()) + 'px'});

        lazyLoad($jumbotron);

        $(window).on('resize', function () {
            $jumbotron.css({height: ($(window).height()) + 'px'});
        });

        cssDelayFix();
    };

    app.controller('notFoundController', ['$scope', function ($scope) {
        initPage();
    }]);

});