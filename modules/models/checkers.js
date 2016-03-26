var Playground = require('./checkers_common/playground'),
    Checker = require('./checkers_common/checker'),
    Coordinates = require('./checkers_common/coordinates'),
    Tile = require('./checkers_common/tile'),
    Direction = require('./checkers_common/direction');

module.exports = class Checkers {

    constructor() {

        this.current_player = Checker.getTypeBlack();

        this.selectedTile = null;

        this.playground = new Playground();

        for (var x = 0; x < 8; x++) {

            for (var y = 0; y < 8; y++) {

                var tile = this.playground.getTile(new Coordinates(x, y));

                if (tile.getType() == Tile.getTypeBlack()) {

                    if (x < 3) {
                        tile.setChecker(new Checker(Checker.getTypeBlack()));
                    }
                    else if (x > 4) {
                        tile.setChecker(new Checker(Checker.getTypeWhite()));
                    }
                }
            }
        }
    };

    getCurrentPlayer() {
        return this.current_player;
    };

    getPlayground() {
        return this.playground;
    };

    selectCheckerXY(x, y) {

        var coordinates = new Coordinates(x, y);

        var selectedTile = this.playground.getTile(coordinates);

        var selectedChecker = selectedTile.getChecker();

        if (selectedChecker == null || selectedChecker.getType() != this.current_player) return false;

        this.selectedTile = selectedTile;

        for (x = 0; x < 8; x++) {

            for (y = 0; y < 8; y++) {

                var tile = this.playground.getTile(new Coordinates(x, y));

                if (tile.getType() == Tile.getTypeWhite()) continue;

                if (tile.getChecker() != null) {
                    tile.getChecker().setSelected(false);
                }

                tile.setAvailable(false);
            }
        }

        selectedChecker.setSelected(true);

        this.findNextStepTiles(selectedChecker);

        return true;
    };

    moveCheckerToXY(x, y) {

        var toCoordinates = new Coordinates(x, y);

        var toTile = this.playground.getTile(toCoordinates);

        var selectedChecker = this.selectedTile.getChecker();

        if (selectedChecker == null || !toTile.isAvailable()) return false;

        selectedChecker.setSelected(false);

        toTile
            .setChecker(selectedChecker.clone())
            .activateEating();

        this.selectedTile.setChecker(null);

        for (x = 0; x < 8; x++) {

            for (y = 0; y < 8; y++) {

                toTile = this.playground.getTile(new Coordinates(x, y));

                if (toTile.getType() == Tile.getTypeWhite()) continue;

                toTile
                    .setAvailable(false)
                    .setTileWithCheckerForEat(null);
            }
        }

        this.current_player = this.current_player == Checker.getTypeBlack()
            ? Checker.getTypeWhite()
            : Checker.getTypeBlack();

        return true;
    };

    findNextStepTiles(selectedChecker) {

        var directions = [];

        if (selectedChecker.isKing() || selectedChecker.getType() == Checker.getTypeBlack()) {
            directions.push(new Direction(1, -1));
            directions.push(new Direction(1, 1));
        }

        if (selectedChecker.isKing() || selectedChecker.getType() == Checker.getTypeWhite()) {
            directions.push(new Direction(-1, -1));
            directions.push(new Direction(-1, 1));
        }

        var stepCoordinates = [],
            exists_eat_directions = false;

        directions.forEach(direction => {

            var coordinatesForCheck = this.selectedTile.getCoordinates().clone(),
                stop = false,
                tileWithCheckerForEat = null;

            do {

                coordinatesForCheck.addDirection(direction);

                stop = !coordinatesForCheck.isValid();

                if (!stop) {

                    var tileForCheck = this.playground.getTile(coordinatesForCheck);

                    var tile_is_busy = tileForCheck.getChecker() != null;

                    if (!tile_is_busy) {
                        stepCoordinates.push(coordinatesForCheck);
                    }

                    if (tile_is_busy && tileForCheck.getChecker().getType() != this.current_player) {

                        tileWithCheckerForEat = tileForCheck;

                        coordinatesForCheck.addDirection(direction);

                        stop = !coordinatesForCheck.isValid();

                        if (!stop) {

                            tileForCheck = this.playground.getTile(coordinatesForCheck);

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
            stepCoordinates.forEach((coordinates) => {
                this.playground.getTile(coordinates).setAvailable(true);
            })
        }
    };

};