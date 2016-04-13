require.config({
    baseUrl: '/js',
    paths: {
        'angular': '/angular/angular.min',
        'angular-route': '/angular-route/angular-route.min',
        'angular-css': '/js/angular-css.min'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-css']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-css': {
            deps: ['angular']
        }
    }
});

require(['app'], function (app) {
    angular.bootstrap(document, ['app']);
});