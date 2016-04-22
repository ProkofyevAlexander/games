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

    var app = angular.module('app', ['ngRoute', 'angularCSS', 'ui.bootstrap', 'duScroll', 'ngClipboard']);

    app.config([
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        'ngClipProvider',
        function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, ngClipProvider) {

            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;

            ngClipProvider.setPath('/zeroclipboard/dist/ZeroClipboard.swf');

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

/*    app.run(function ($rootScope) {

        if (!window.history || !history.replaceState) {
            return;
        }

        $rootScope.$on('duScrollspy:becameActive', function ($event, $element, $target) {

            //Automatically update location
            var hash = $element.attr('du-scrollspy');
            if (hash) {
                console.log(hash);
                history.replaceState(null, '', window.location.pathname + '#' + hash);
            }
        });
    });*/

    return app;
});
