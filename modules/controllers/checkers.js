var Coordinates = require('./../models/checkers_common/coordinates'),
    Direction = require('./../models/checkers_common/direction'),
    Tile = require('./../models/checkers_common/tile'),
    Checker = require('./../models/checkers_common/checker');

module.exports = function ($scope) {

    var PLAYER_BLACK = 'black',
        PLAYER_WHITE = 'white',
        TILE_BLACK = 'black',
        TILE_WHITE = 'white';

    var _selectedTile = null;

    var setTile = function (coordinates, tile) {
        return $scope.rows[coordinates.getX()][coordinates.getY()] = tile;
    };

    var getTile = function (coordinates) {
        return $scope.rows[coordinates.getX()][coordinates.getY()];
    };

    var findNextStepTiles = (selectedChecker) => {

        var directions = [];

        if (selectedChecker.isKing() || selectedChecker.getType() == PLAYER_BLACK) {
            directions.push(new Direction(1, -1));
            directions.push(new Direction(1, 1));
        }

        if (selectedChecker.isKing() || selectedChecker.getType() == PLAYER_WHITE) {
            directions.push(new Direction(-1, -1));
            directions.push(new Direction(-1, 1));
        }

        var stepCoordinates = [],
            exists_eat_directions = false;

        directions.forEach(direction => {

            var coordinatesForCheck = _selectedTile.getCoordinates().clone(),
                stop = false,
                tileWithCheckerForEat = null;

            do {

                coordinatesForCheck.addDirection(direction);

                stop = !coordinatesForCheck.isValid();

                if (!stop) {

                    var tileForCheck = getTile(coordinatesForCheck);

                    var tile_is_busy = tileForCheck.getChecker() != null;

                    if (!tile_is_busy) {
                        stepCoordinates.push(coordinatesForCheck);
                    }

                    if (tile_is_busy && tileForCheck.getChecker().getType() != $scope.current_player) {

                        tileWithCheckerForEat = tileForCheck;

                        coordinatesForCheck.addDirection(direction);

                        stop = !coordinatesForCheck.isValid();

                        if (!stop) {

                            tileForCheck = getTile(coordinatesForCheck);

                            tile_is_busy = tileForCheck.getChecker() != null;
                            tileForCheck.setAvailable(!tile_is_busy);

                            if (!tile_is_busy) {
                                tileForCheck.setTileWithCheckerForEat(tileWithCheckerForEat);
                            }

                            exists_eat_directions = exists_eat_directions || !tile_is_busy;
                        }
                    }
                }

                stop = stop || !selectedChecker.isKing();

            } while (!stop);

        });

        if (!exists_eat_directions) {
            stepCoordinates.forEach(function (coordinates) {
                getTile(coordinates).setAvailable(true);
            })
        }
    };

    var initPlayground = ($scope) => {

        $scope.rows = [];
        $scope.current_player = PLAYER_BLACK;

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

            _selectedTile = selected_tile;

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

            findNextStepTiles(selected_checker);

            return true;
        };

        $scope.moveChecker = function (tile) {

            var selectedChecker = _selectedTile.getChecker();

            if (selectedChecker == null || !tile.isAvailable()) return false;

            selectedChecker.setSelected(false);

            tile
                .setChecker(selectedChecker.clone())
                .activateEating();

            _selectedTile.setChecker(null);

            for (var x = 0; x < 8; x++) {

                for (var y = 0; y < 8; y++) {

                    tile = getTile(new Coordinates(x, y));

                    if (tile.getType() == TILE_WHITE) continue;

                    tile
                        .setAvailable(false)
                        .setTileWithCheckerForEat(null);
                }
            }

            $scope.current_player = $scope.current_player == PLAYER_BLACK
                ? PLAYER_WHITE
                : PLAYER_BLACK;

            return true;
        };

    };

    initPlayground($scope);
};