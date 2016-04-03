
angular.module('app', [])

/*    .component('main', {
        templateUrl: '/components/main',
        controller: function(){}
    })*/

    .component('checkers', {
        templateUrl: '/components/games/checkers',
        controller: require('./games/checkers')
    });
