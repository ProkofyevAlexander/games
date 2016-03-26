// named
var gamesApp = angular.module('gamesApp', []);

gamesApp.controller('CheckersPlaygroundCtrl', function ($scope) {

    var PLAYER_BLACK = 'black',
        PLAYER_WHITE = 'white',
        TILE_BLACK = 'black',
        TILE_WHITE = 'white';

    class Direction {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        getX() {
            return this.x;
        };

        getY() {
            return this.y;
        };
    }

    class Coordinates {

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        getX() {
            return this.x;
        };

        getY() {
            return this.y;
        };

        clone() {
            return new Coordinates(this.x, this.y);
        };

        addDirection(direction) {
            this.x += direction.getX();
            this.y += direction.getY();
        };

        isValid() {
            return this.x > -1 && this.x < 8 && this.y > -1 && this.y < 8;
        };
    }

    class Checker {

        constructor(type) {
            this.type = type;
            this.king = false;
            this.selected = false;
        }

        getType() {
            return this.type;
        };

        setKing(king) {
            this.king = king;
            return this;
        };

        isKing() {
            return this.king;
        };

        setSelected(selected) {
            this.selected = selected;
            return this;
        };

        isSelected() {
            return this.selected;
        };

        clone() {

            var checker = new Checker(this.type);

            checker
                .setSelected(this.selected)
                .setKing(this.king);

            //return Object.assign({}, this)

            return checker;
        };
    }

    class Tile {

        constructor(coordinates, type) {
            this.coordinates = coordinates;
            this.type = type;
            this.checker = null;
            this.available = false;
        }

        getCoordinates() {
            return this.coordinates;
        };

        getType() {
            return this.type;
        };

        setChecker(checker) {
            this.checker = checker;
            return this;
        };

        getChecker() {
            return this.checker;
        };

        setAvailable(available) {
            this.available = available;
            return this;
        };

        isAvailable() {
            return this.available;
        };
    }

    var _selected_tile = null;

    $scope.rows = [];
    $scope.current_player = PLAYER_BLACK;

    var setTile = function (coordinates, tile) {
        return $scope.rows[coordinates.getX()][coordinates.getY()] = tile;
    };

    var getTile = function (coordinates) {
        return $scope.rows[coordinates.getX()][coordinates.getY()];
    };

    for (var x = 0; x < 8; x++) {

        $scope.rows[x] = [];

        for (var y = 0; y < 8; y++) {

            var coordinates = new Coordinates(x, y);

            var tile = new Tile(coordinates, ((x + y) % 2 == 0 ? TILE_WHITE : TILE_BLACK));

            if (tile.getType() == TILE_BLACK) {

                var checker = null;

                if (x < 3) {
                    checker = new Checker(PLAYER_BLACK);
                }
                else if (x > 4) {
                    checker = new Checker(PLAYER_WHITE);
                }

                tile.setChecker(checker);
            }

            setTile(coordinates, tile);
        }
    }

    $scope.selectChecker = function (selected_tile) {

        var selected_checker = selected_tile.getChecker();

        if (selected_checker == null || selected_checker.getType() != $scope.current_player) return false;

        _selected_tile = selected_tile;

        for (var x = 0; x < 8; x++) {

            for (var y = 0; y < 8; y++) {

                var tile = getTile(new Coordinates(x, y));

                if (tile.getType() == TILE_WHITE) continue;

                if (tile.getChecker() != null) {
                    tile.getChecker().setSelected(false);
                }

                tile.setAvailable(false);
            }
        }

        selected_checker.setSelected(true);

        var directions = [];

        if (selected_checker.isKing() || selected_checker.getType() == PLAYER_BLACK) {
            directions.push(new Direction(1, -1));
            directions.push(new Direction(1, 1));
        }

        if (selected_checker.isKing() || selected_checker.getType() == PLAYER_WHITE) {
            directions.push(new Direction(-1, -1));
            directions.push(new Direction(-1, 1));
        }

        var step_coordinates = [],
            exists_eat_directions = false;

        directions.forEach(direction => {

            var coordinates_for_check = _selected_tile.getCoordinates().clone(),
                stop = false;

            do {

                coordinates_for_check.addDirection(direction);

                stop = !coordinates_for_check.isValid();

                if (!stop) {

                    var tile_for_check = getTile(coordinates_for_check);

                    var tile_is_busy = tile_for_check.getChecker() != null;

                    if (!tile_is_busy) {
                        step_coordinates.push(coordinates_for_check);
                    }

                    if (tile_is_busy && tile_for_check.getChecker().getType() != $scope.current_player) {

                        coordinates_for_check.addDirection(direction);

                        stop = !coordinates_for_check.isValid();

                        if (!stop) {

                            tile_for_check = getTile(coordinates_for_check);

                            tile_is_busy = tile_for_check.getChecker() != null;
                            tile_for_check.setAvailable(!tile_is_busy);

                            exists_eat_directions = exists_eat_directions || !tile_is_busy;
                        }
                    }
                }

                stop = stop || !selected_checker.isKing();

            } while (!stop);

        });

        if (!exists_eat_directions) {
            step_coordinates.forEach(function (coordinates) {
                getTile(coordinates).setAvailable(true);
            })
        }

        return true;
    };

    $scope.moveChecker = function (tile) {

        var selected_checker = _selected_tile.getChecker();

        if (selected_checker == null || !tile.isAvailable()) return false;

        selected_checker.setSelected(false);

        tile.setChecker(selected_checker.clone());

        _selected_tile.setChecker(null);

        for (var x = 0; x < 8; x++) {

            for (var y = 0; y < 8; y++) {

                tile = getTile(new Coordinates(x, y));

                if (tile.getType() == TILE_WHITE) continue;

                tile.setAvailable(false);
            }
        }

        $scope.current_player = $scope.current_player == PLAYER_BLACK
            ? PLAYER_WHITE
            : PLAYER_BLACK;

        return true;
    };
});