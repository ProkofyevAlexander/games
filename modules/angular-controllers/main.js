
angular.module('app', ['ngComponentRouter'])

    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    })

    .value('$routerRootComponent', 'app')

    .component('app', {
        $routeConfig: [
            {path: '/:lng/', name: 'Main', component: 'main'},
            {path: '/:lng/checkers/', name: 'Checkers', component: 'checkers'}
        ]
    })

    .component('main', {
        templateUrl: '/components/main'
    })

    .component('checkers', {
        templateUrl: '/components/games/checkers',
        controller: require('./games/checkers')
    });
