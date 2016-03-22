var gamesApp = angular.module('gamesApp', []);

gamesApp.controller('CheckersPlaygroundCtrl', function ($scope) {

    var rows = [];

    for (var x = 0; x < 8; x++) {

        var row = [],
            type,
            checker;

        for (var y = 0; y < 8; y++) {

            checker = '';

            type = (x + y) % 2 == 0
                ? 'white'
                : 'black';

            if (type == 'black') {
                if (x < 3) {
                    checker = 'black';
                }
                else if (x > 4) {
                    checker = 'white';
                }
            }

            row.push({
                type: type,
                checker: checker,
                selected: false
            });
        }

        rows.push(row);
    }

    $scope.rows = rows;

    $scope.selectChecker = function() {
        
    };
});