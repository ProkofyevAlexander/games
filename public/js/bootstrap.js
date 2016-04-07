require.config({
    baseUrl: '/js',
    paths: {
        'angular': '/angular/angular',
        'angular-route': '/angular-route/angular-route'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route']
        },
        'angular-route': {
            deps: ['angular']
        }
    }
});

require(['app'], function (app) {
    angular.bootstrap(document, ['app']);
});