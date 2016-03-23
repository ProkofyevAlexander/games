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

        var tile_type,
            checker;

        for (y = 0; y < 8; y++) {

            checker = {
                type: null,
                king: false,
                selected: false
            };

            tile_type = (x + y) % 2 == 0
                ? TILE_WHITE
                : TILE_BLACK;

            if (tile_type == TILE_BLACK) {

                if (x < 3) checker.type = PLAYER_BLACK;
                else if (x > 4) checker.type = PLAYER_WHITE;
            }

            $scope.rows[x][y] = {
                type: tile_type,
                checker: checker,
                available: false
            };
        }
    }

    $scope.selectChecker = function (selected_x, selected_y) {

        var current_checker = $scope.rows[selected_x][selected_y].checker;

        if ($scope.current_player != current_checker.type) return false;

        for (x = 0; x < 8; x++) {

            for (y = 0; y < 8; y++) {

                if ($scope.rows[x][y].type == TILE_WHITE) continue;

                $scope.rows[x][y].checker.selected = (selected_x == x && selected_y == y);
                $scope.rows[x][y].available = false;
            }
        }


        var directions = [];

        if (current_checker.king || current_checker.type == PLAYER_BLACK) {
            directions.push([1, -1]);
            directions.push([1, 1]);
        }

        if (current_checker.king || current_checker.type == PLAYER_WHITE) {
            directions.push([-1, -1]);
            directions.push([-1, 1]);
        }

        directions.forEach(function (direction) {

            var check_x = selected_x,
                check_y = selected_y,
                stop = false;

            do {

                check_x += direction[0];
                check_y += direction[1];

                stop = check_x < 0 || check_x > 7 || check_y < 0 || check_y > 7;

                if (!stop) {
                    $scope.rows[check_x][check_y].available = $scope.rows[check_x][check_y].checker.type == null;
                }

            } while (current_checker.king && !stop);

        });

        return true;
    };
});