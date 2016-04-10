require.config({
    baseUrl: '/js',
    paths: {
        'angular': '/angular/angular',
        'angular-route': '/angular-route/angular-route',
        'angular-css': '/js/angular-css'
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