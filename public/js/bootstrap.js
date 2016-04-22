require.config({
    baseUrl: '/js',
    paths: {
        'angular': '/angular/angular.min',
        'angular-route': '/angular-route/angular-route.min',
        'angular-animate': '/angular-animate/angular-animate.min',
        'angular-touch': '/angular-touch/angular-touch.min',
        'angular-ui-bootstrap-tpls': '/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-css': '/js/angular-css.min',
        'angular-scroll': '/angular-scroll/angular-scroll.min',
        'jquery': '/jquery/dist/jquery.min',
        'ng-clip': '/ng-clip/dest/ng-clip.min',
        'zeroclipboard': '/zeroclipboard/dist/ZeroClipboard'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-ui-bootstrap-tpls', 'angular-css', 'angular-scroll', 'ng-clip', 'jquery']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-ui-bootstrap-tpls': {
            deps: ['angular', 'angular-animate', 'angular-touch']
        },
        'angular-css': {
            deps: ['angular']
        },
        'angular-scroll': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'ng-clip': {
            deps: ['angular', 'zeroclipboard']
        }
    }
});

require(['app', 'zeroclipboard'], function (app, ZeroClipboard) {
    if (typeof window.ZeroClipboard == 'undefined' && typeof ZeroClipboard == 'function') {
        window.ZeroClipboard = ZeroClipboard;
    }
    angular.bootstrap(document, ['app']);
});