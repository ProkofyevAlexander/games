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

    var checkBrowser = function ($scope, $uibModal) {

        var loBrowserVersion = getBrowserAndVersion();

        if (loBrowserVersion.browser == 'Explorer' && loBrowserVersion.version < 8) {

            $uibModal.open({
                animation: false,
                templateUrl: 'upgradeDialog.html'
            });
        }
    };

    var app = angular.module('app', ['ngRoute', 'angularCSS', 'ui.bootstrap', 'duScroll']);

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
    
    app.controller('appController', ['$scope', '$uibModal', function($scope, $uibModal){
        checkBrowser($scope, $uibModal);
    }]);

    app.run(function ($rootScope) {

        if (!window.history || !history.replaceState) {
            return;
        }

        $rootScope.$on('duScrollspy:becameActive', function ($event, $element, $target) {

            //Automaticly update location
            var hash = $element.attr('du-scrollspy');
            if (hash) {
                //console.log(hash);
                history.replaceState(null, null, window.location.pathname + '#' + hash);
            }
        });
    });

    return app;
});
