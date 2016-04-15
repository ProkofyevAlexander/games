define(['app'], function (app) {

    app.controller('mainController', ['$scope', function ($scope) {

        var lnStickyNavigation,
            $body,
            $jumbotron,
            $navbarLi,
            $scrollDown;

        /* HEADER FUNCTIONS */

        var applyHeader = function () {
            $jumbotron.css({height: ($(window).height()) + 'px'});
        };

        /* NAVIGATION FUNCTIONS */

        var applyNavigation = function () {
            applyClickEvent();
            applyNavigationFixForPhone();
            applyStickyNavigation();
        };

        var applyClickEvent = function () {

            $('a[href*="#"]').on('click', function (e) {

                e.preventDefault();

                var $scrollTarget = $($(this).attr('href'));

                if ($scrollTarget.length > 0) {
                    $('html, body').animate({
                        scrollTop: $scrollTarget.offset().top
                    }, 400);
                }
                return false;
            });
        };

        var applyNavigationFixForPhone = function () {

            var $navbarCollapse = $('.navbar-collapse');

            $navbarCollapse.on('click');

            $navbarLi.find('a').click(function () {
                $navbarCollapse.removeClass('in').addClass('collapse');
            });
        };

        var applyStickyNavigation = function () {

            lnStickyNavigation = $scrollDown.offset().top + 20;

            $(window).on('scroll', function () {
                stickyNavigation();
            });

            stickyNavigation();
        };

        var stickyNavigation = function () {
            if ($(window).scrollTop() > lnStickyNavigation) {
                $body.addClass('fixed');
            }
            else {
                $body.removeClass('fixed');
            }
        };

        /* MAILTO FUNCTION */

        var applyMailTo = function () {
            $('a[href*="mailto"]').on('click', function () {

                var lstrEmail = $(this).attr('href').replace('mailto:', '');

                lstrEmail = lstrEmail.split('').reverse().join('');

                $(this).attr('href', 'mailto:' + lstrEmail);
            });
        };

        /* RESIZE FUNCTION */

        var applyResize = function () {

            $(window).on('resize', function () {

                lnStickyNavigation = $scrollDown.offset().top + 20;

                $jumbotron.css({height: ($(window).height()) + 'px'});
            });
        };

        /* HASH FUNCTION */

        var checkHash = function () {

            var lstrHash = window.location.hash;

            var $a = $('a[href="' + lstrHash + '"]');

            if ($a.length > 0) {
                $a.trigger('click');
            }
        };

        var initPage = function () {

            console.log('initPage');
            $body = $('body');
            $jumbotron = $body.find('.jumbotron');
            $navbarLi = $body.find('.navbar li');
            $scrollDown = $body.find('.scroll-down');

            applyHeader();
            applyNavigation();
            applyMailTo();
            applyResize();
            checkHash();
        };

        setTimeout(initPage, 200);
    }]);

});