var gamesApp = angular.module('gamesApp', []);

gamesApp.controller('CheckersPlaygroundCtrl', function ($scope) {

    var x, y;
    $scope.rows = [];

    for (x = 0; x < 8; x++) {

        $scope.rows[x] = [];

        var type,
            checker;

        for (y = 0; y < 8; y++) {

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

            $scope.rows[x][y] = {
                type: type,
                checker: checker,
                selected: false
            };
        }
    }

    $scope.selectChecker = function(px, py) {
        for (x = 0; x < 8; x++) {
            for (y = 0; y < 8; y++) {
                $scope.rows[x][y].selected = (px == x && py == y);
            }
        }
    };
});