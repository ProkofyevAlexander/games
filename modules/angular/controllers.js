var Checkers = require('../models/checkers');

var gamesApp = angular.module('gamesApp', []);

gamesApp.controller('CheckersPlaygroundCtrl', ($scope) => {
    var checkers = new Checkers();

    $scope.checkers = checkers;
    $scope.playground = checkers.getPlayground();
});