define(['app'], function (app) {

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
        applyScrollSpy();
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

    var applyScrollSpy = function () {

        $body
            .scrollspy({target: '#navbar'})
            .scrollspy('refresh')
            .on('activate.bs.scrollspy', function () {

                var $navbarLiActive = $navbarLi.filter('.active');

                if ($navbarLiActive.length > 0) {
                    window.history.replaceState({}, '', window.location.pathname + $navbarLiActive.find('a').attr('href'));
                }
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

    /* IE7- FALLBACK FUNCTIONS */

    var checkBrowser = function () {

        var loBrowserVersion = getBrowserAndVersion();

        if (loBrowserVersion.browser == 'Explorer' && loBrowserVersion.version < 8) {

            $('#upgrade-dialog').modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    };

    var getBrowserAndVersion = function () {

        var laBrowserData = [{
            string: navigator.userAgent,
            subString: 'MSIE',
            identity: 'Explorer',
            versionSearch: 'MSIE'
        }];

        return {
            browser: searchString(laBrowserData) || 'Modern Browser',
            version: searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || '0.0'
        };
    };

    var searchString = function (paData) {

        for (var i = 0, i_max = paData.length; i < i_max; i++) {

            var lstrDataString = paData[i].string;
            var lstrDataProp = paData[i].prop;

            this.versionSearchString = paData[i].versionSearch || paData[i].identity;

            if (lstrDataString) {
                if (lstrDataString.indexOf(paData[i].subString) != -1) {
                    return paData[i].identity;
                }
            }
            else if (lstrDataProp) {
                return paData[i].identity;
            }
        }
    };

     var searchVersion = function(pstrDataString) {

        var lnIndex = pstrDataString.indexOf(this.versionSearchString);

        if (lnIndex == -1) {
            return;
        }

        return parseFloat(pstrDataString.substring(lnIndex + this.versionSearchString.length + 1));
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
        checkBrowser();
        cssDelayFix();
    };

    app.controller('mainController', ['$scope', function ($scope) {
        initPage();
    }]);

});