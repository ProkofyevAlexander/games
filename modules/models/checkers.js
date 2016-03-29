var Playground = require('./checkers_common/playground'),
    Checker = require('./checkers_common/checker'),
    Coordinates = require('./checkers_common/coordinates'),
    Tile = require('./checkers_common/tile'),
    Direction = require('./checkers_common/direction');

module.exports = class Checkers {

    constructor() {

        this.current_player = Checker.getTypeWhite();

        this.selectedTile = null;

        this.playground = new Playground();

        this.blackTiles = [];

        this.tilesWithCheckerForEat = [];

        this.playground.getTiles().forEach(tile => {

            var coordinates = tile.getCoordinates();

            if (tile.getType() == Tile.getTypeBlack()) {

                this.blackTiles.push(tile);

                if (coordinates.getX() < 3) {
                    tile.setChecker(new Checker(Checker.getTypeBlack(), coordinates, this.current_player == Checker.getTypeBlack()));
                }
                else if (coordinates.getX() > 4) {
                    tile.setChecker(new Checker(Checker.getTypeWhite(), coordinates, this.current_player == Checker.getTypeWhite()));
                }
            }
        });

    };

    getCurrentPlayer() {
        return this.current_player;
    };

    getPlayground() {
        return this.playground;
    };

    selectCheckerXY(x, y) {

        var coordinates = new Coordinates(x, y),
            selectedTile = this.playground.getTile(coordinates),
            selectedChecker = selectedTile.getChecker();

        if (selectedChecker == null || !selectedChecker.isAvailable()) return false;

        this.selectedTile = selectedTile;

        this.blackTiles.forEach(tile => {

            if (tile.getChecker() != null) {
                tile.getChecker().setSelected(false);
            }
            tile.setAvailable(false);
        });

        selectedChecker.setSelected(true);

        this.findNextStepTiles(selectedChecker);

        return true;
    };

    moveCheckerToXY(x, y) {

        var toCoordinates = new Coordinates(x, y),
            toTile = this.playground.getTile(toCoordinates);

        if (!toTile.isAvailable()) return false;

        var selectedChecker = this.selectedTile.getChecker();

        if (selectedChecker == null) return false;

        selectedChecker = selectedChecker.clone();
        selectedChecker.setCoordinates(toCoordinates);

        var set_as_king =
            toCoordinates.getX() == 0 && selectedChecker.getType() == Checker.getTypeWhite() ||
            toCoordinates.getX() == 7 && selectedChecker.getType() == Checker.getTypeBlack();

        if (set_as_king) {
            selectedChecker.setKing(true);
        }

        //@TODO Deny soft steps for king
        //@TODO Check on winner or draw
        //@TODO If only one checker have steps make it selected automatically

        var tileWithCheckerForEat = toTile
            .setChecker(selectedChecker)
            .getTileWithCheckerForEat();

        this.selectedTile.setChecker(null);

        this.blackTiles.forEach(tile => {
            tile.setAvailable(false);
        });

        if (tileWithCheckerForEat != null) {
            tileWithCheckerForEat.getChecker().setMarkedForEat();
            this.tilesWithCheckerForEat.push(tileWithCheckerForEat);
        }

        var eatingStepTiles = tileWithCheckerForEat != null
            ? this.findEatingStepTiles(selectedChecker)
            : [];

        if (eatingStepTiles.length > 0) {

            this.selectedTile = toTile;

            this.blackTiles.forEach(tile => {
                if (tile.getChecker() != null && tile.getChecker() != selectedChecker) {
                    tile.getChecker().setAvailable(false);
                }
            });

            Checkers.makeTilesAvailable(eatingStepTiles);
        }
        else {

            while (this.tilesWithCheckerForEat.length > 0) {
                tileWithCheckerForEat = this.tilesWithCheckerForEat.pop();
                tileWithCheckerForEat.setChecker(null);
            }

            this.blackTiles.forEach(tile => {
                tile.setTileWithCheckerForEat(null);
            });

            selectedChecker.setSelected(false);

            this.current_player = this.current_player == Checker.getTypeBlack()
                ? Checker.getTypeWhite()
                : Checker.getTypeBlack();

            var exist_checkers_that_can_eat = false,
                playerCheckers = [];

            this.blackTiles.forEach(tile => {

                var checker = tile.getChecker();

                if (checker != null) {
                    if (checker.getType() == this.current_player) {
                        if (this.findEatingStepTiles(checker).length > 0) {
                            checker.setAvailable(true);
                            exist_checkers_that_can_eat = true;
                        }
                        else {
                            playerCheckers.push(checker);
                        }
                    }
                    else {
                        checker.setAvailable(false);
                    }
                }
            });

            if (!exist_checkers_that_can_eat) {
                playerCheckers.forEach(checker => {
                    checker.setAvailable(true);
                });
            }
        }
    };

    static getDirections(checker, for_eat) {

        for_eat = for_eat || false;

        var directions = [];

        if (for_eat || checker.isKing() || checker.getType() == Checker.getTypeBlack()) {
            directions.push(new Direction(1, -1));
            directions.push(new Direction(1, 1));
        }

        if (for_eat || checker.isKing() || checker.getType() == Checker.getTypeWhite()) {
            directions.push(new Direction(-1, -1));
            directions.push(new Direction(-1, 1));
        }

        return directions;
    };

    findStepTiles(checker) {

        var directions = Checkers.getDirections(checker),
            stepTiles = [];

        directions.forEach(direction => {

            var coordinates = checker.getCoordinates().clone(),
                stop = false;

            do {

                coordinates.add(direction);

                if (coordinates.isValid()) {

                    var checkedTile = this.playground.getTile(coordinates);

                    if (checkedTile.getChecker() == null) {

                        stepTiles.push(checkedTile);

                        if (!checker.isKing()) {
                            stop = true;
                        }
                    }
                    else {
                        stop = true;
                    }
                }
                else {
                    stop = true;
                }

            } while (!stop);

        });

        return stepTiles;

    };

    findEatingStepTiles(checker) {

        var directions = Checkers.getDirections(checker, true),
            eatingStepTiles = [];

        directions.forEach(direction => {

            var coordinates = checker.getCoordinates().clone(),
                checkerForEat = null,
                stop = false;

            do {

                coordinates.add(direction);

                if (coordinates.isValid()) {

                    var checkedTile = this.playground.getTile(coordinates),
                        checkedChecker = checkedTile.getChecker();

                    if (checkerForEat != null) {

                        if (checkedChecker == null) {

                            checkedTile.setTileWithCheckerForEat(checkerForEat);

                            eatingStepTiles.push(checkedTile);

                            if (!checker.isKing()) {
                                stop = true;
                            }
                        }
                        else {
                            stop = true;
                        }
                    }
                    else {

                        if (checkedChecker != null) {

                            if (checkedChecker.getType() != checker.getType() && !checkedChecker.isMarkedForEat()) {
                                checkerForEat = checkedTile;
                            }
                            else {
                                stop = true;
                            }
                        }
                        else if (!checker.isKing()) {
                            stop = true;
                        }
                    }
                }
                else {
                    stop = true;
                }

            } while (!stop);

        });

        return eatingStepTiles;
    };

    findNextStepTiles(selectedChecker) {

        var eatingStepTiles = this.findEatingStepTiles(selectedChecker);

        if (eatingStepTiles.length > 0) {
            Checkers.makeTilesAvailable(eatingStepTiles);
        }
        else {
            Checkers.makeTilesAvailable(this.findStepTiles(selectedChecker))
        }
    };

    static makeTilesAvailable(tiles) {
        tiles.forEach(tile => {
            tile.setAvailable(true);
        });
    }

};