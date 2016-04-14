require.config({
    baseUrl: '/js',
    paths: {
        'angular': '/angular/angular.min',
        'angular-route': '/angular-route/angular-route.min',
        'angular-css': '/js/angular-css.min',
        'twitter-bootstrap': '/bootstrap/dist/js/bootstrap.min',
        'jquery': '/jquery/dist/jquery.min'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-css', 'jquery', 'twitter-bootstrap']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-css': {
            deps: ['angular']
        },
        'twitter-bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['app'], function (app) {
    angular.bootstrap(document, ['app']);
});