define(['routes'], function (config) {

    var dependencyResolverFor = function (dependencies) {

        return {
            resolver: ['$q', '$rootScope', function ($q, $rootScope) {

                var deferred = $q.defer();

                require(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            }]
        };
    };

    var app = angular.module('app', ['ngRoute', 'angularCSS', 'duScroll'])
        .run(function ($rootScope) {
            if (!window.history || !history.replaceState) {
                return;
            }

            $rootScope.$on('duScrollspy:becameActive', function ($event, $element, $target) {

                //Automaticly update location
                var hash = $element.attr('du-scrollspy');
                if (hash) {
                    console.log(hash);
                    history.replaceState(null, null, window.location.pathname + '#' + hash);
                }
            });
        });

    app.config([
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;

            $locationProvider.html5Mode(true);

            if (config.routes !== undefined) {
                angular.forEach(config.routes, function (route, path) {
                    $routeProvider.when(path, {
                        templateUrl: route.templateUrl,
                        resolve: dependencyResolverFor(route.dependencies),
                        css: route.css
                    })

                });
                $routeProvider.otherwise({
                    templateUrl: '/404',
                    resolve: dependencyResolverFor(['controllers/404']),
                    css: ['/css/main.css']
                });
            }
        }
    ]);

    return app;
});
