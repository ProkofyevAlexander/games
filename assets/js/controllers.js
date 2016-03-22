var gamesApp = angular.module('gamesApp', []);

gamesApp.controller('CheckersPlaygroundCtrl', function ($scope) {

    $scope.rows = [];

    for (var x = 0; x < 8; x++) {

        var row = [];

        for (var y = 0; y < 8; y++) {
            row.push({});
        }

        $scope.rows.push(row);
    }
});