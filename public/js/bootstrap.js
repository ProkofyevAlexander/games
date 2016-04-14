require.config({
    baseUrl: '/js',
    paths: {
        'angular': '/angular/angular',//.min
        'angular-route': '/angular-route/angular-route',//.min
        'angular-animate': '/angular-animate/angular-animate',//.min
        'angular-touch': '/angular-touch/angular-touch',//.min
        'angular-ui': '/angular-ui/build/angular-ui',//.min
        'angular-css': '/js/angular-css.min',
        'angular-scroll': '/angular-scroll/angular-scroll',//.min
        'jquery': '/jquery/dist/jquery.min'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-ui', 'angular-css', 'jquery', 'angular-scroll']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-ui': {
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
        }
    }
});

require(['app'], function (app) {
    angular.bootstrap(document, ['app']);
});