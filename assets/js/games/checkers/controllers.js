var gamesApp = angular.module('gamesApp', []);

gamesApp.controller('CheckersPlaygroundCtrl', function ($scope) {

    var PLAYER_BLACK = 'black',
        PLAYER_WHITE = 'white',
        TILE_BLACK = 'black',
        TILE_WHITE = 'white';

    var x, y;
    $scope.rows = [];
    $scope.current_player = PLAYER_BLACK;

    for (x = 0; x < 8; x++) {

        $scope.rows[x] = [];

        var type,
            checker;

        for (y = 0; y < 8; y++) {

            checker = '';

            type = (x + y) % 2 == 0
                ? TILE_WHITE
                : TILE_BLACK;

            if (type == TILE_BLACK) {
                if (x < 3) {
                    checker = TILE_BLACK;
                }
                else if (x > 4) {
                    checker = PLAYER_WHITE;
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

        if ($scope.current_player != $scope.rows[px][py].checker) {
            return false;
        }

        for (x = 0; x < 8; x++) {
            for (y = 0; y < 8; y++) {
                $scope.rows[x][y].selected = (px == x && py == y);
            }
        }

        return true;
    };
});