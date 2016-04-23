var Playground = require('./checkers_common/playground'),
    Checker = require('./checkers_common/checker'),
    Coordinates = require('./checkers_common/coordinates'),
    Tile = require('./checkers_common/tile'),
    Direction = require('./checkers_common/direction');

module.exports = class Checkers {

    constructor() {

        this.onlinePlayer = null;
        this.selectedTile = null;
        this.winner = null;
        this.playground = new Playground();
        this.blackTiles = [];
        this.tilesWithCheckerForEat = [];
        this.playground.getTiles().forEach(tile => {

            if (tile.getType() == Tile.getTypeBlack()) {
                this.blackTiles.push(tile);
            }
        });

        this.setInitialState();
    };

    exportState() {

        var checkers = [];

        this.blackTiles.forEach(tile => {

            if (tile.getChecker() != null) {

                var checker = tile.getChecker();

                checkers.push(checker.exportData());
            }
        });

        return {
            currentPlayer: this.currentPlayer,
            selectedTile: this.selectedTile,
            winner: this.winner,
            checkers: checkers
        };
    }

    importState(data) {

        this.currentPlayer = data.currentPlayer;
        this.selectedTile = data.selectedTile;
        this.winner = data.winner;

        this.blackTiles.forEach(tile => {
            tile.setChecker(null);
        });

        data.checkers.forEach(checkerData => {
            var checker = Checker.createFormExport(checkerData);
            this.playground.getTile(checker.getCoordinates()).setChecker(checker);
        });

        if (this.onlinePlayer == null || this.currentPlayer == this.onlinePlayer) {
            this.calculateAvailability();
        }
    }

    setInitialState() {

        var checkers = [];

        this.blackTiles.forEach(tile => {

            var coordinates = tile.getCoordinates();

            var checker = null;

            if (coordinates.getX() < 3) {
                checker = new Checker(Checker.getTypeBlack(), coordinates);
            }
            else if (coordinates.getX() > 4) {
                checker = new Checker(Checker.getTypeWhite(), coordinates);
            }

            if (checker != null) {
                checkers.push(checker.exportData());
            }

        });

        var data = {
            currentPlayer: Checker.getTypeWhite(),
            selectedTile: null,
            winner: null,
            checkers: checkers
        };

        this.importState(data);
    }

    isPlayerActive() {
        return this.onlinePlayer == null ||
            this.onlinePlayer == this.currentPlayer;
    }

    setOnlinePlayer(playerType) {

        if (playerType == Checker.getTypeWhite() || playerType == Checker.getTypeBlack()) {

            this.onlinePlayer = playerType;

            this.blackTiles.forEach(tile => {

                if (tile.getChecker() != null) {
                    var checker = tile.getChecker();
                    checker.setAvailable(checker.getType() == this.getCurrentPlayer() && this.isPlayerActive());
                }
            });
        }

        return this;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    };

    getWinner() {
        return this.winner;
    }

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

        if (selectedChecker == null || !selectedChecker.isAvailable()) return false;

        selectedChecker = selectedChecker.clone();
        selectedChecker.setCoordinates(toCoordinates);

        var setAsKing =
            toCoordinates.getX() == 0 && selectedChecker.getType() == Checker.getTypeWhite() ||
            toCoordinates.getX() == 7 && selectedChecker.getType() == Checker.getTypeBlack();

        if (setAsKing) {
            selectedChecker.setKing(true);
        }
        
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

            selectedChecker.setAvailable(true);

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

            this.currentPlayer = this.currentPlayer == Checker.getTypeBlack()
                ? Checker.getTypeWhite()
                : Checker.getTypeBlack();

            if (this.isPlayerActive()) {

                this.calculateAvailability();
            }
            else {
                this.blackTiles.forEach(tile => {
                    if (tile.getChecker() != null) {
                        tile.getChecker().setAvailable(false);
                    }
                });
            }
        }
    };

    calculateAvailability() {

        var existCheckersThatCanEat = false,
            playerCheckers = [];

        this.blackTiles.forEach(tile => {

            var checker = tile.getChecker();

            if (checker != null) {
                if (checker.getType() == this.currentPlayer) {
                    if (this.findEatingStepTiles(checker).length > 0) {
                        checker.setAvailable(true);
                        existCheckersThatCanEat = true;
                    }
                    else if (this.checkerHaveSteps(checker)) {
                        playerCheckers.push(checker);
                    }
                }
                else {
                    checker.setAvailable(false);
                }
            }
        });

        if (!existCheckersThatCanEat) {

            if (playerCheckers.length > 0) {
                playerCheckers.forEach(checker => {
                    checker.setAvailable(true);
                });
            }
            else {
                this.winner = this.currentPlayer == Checker.getTypeBlack()
                    ? Checker.getTypeWhite()
                    : Checker.getTypeBlack();
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

    checkerHaveSteps(checker) {

        var directions = Checkers.getDirections(checker),
            checkerHaveSteps = false;

        directions.forEach(direction => {

            var coordinates = checker.getCoordinates().clone();

            coordinates.add(direction);

            if (coordinates.isValid()) {

                if (this.playground.getTile(coordinates).getChecker() == null) {
                    checkerHaveSteps = true;
                }
            }
        });

        return checkerHaveSteps;
    }

    findEatingStepTiles(checker) {

        var directions = Checkers.getDirections(checker, true);

        var findEatingStepTiles = (directions, forCoordinates, checker) => {

            var eatingStepTiles = [];

            directions.forEach(direction => {

                var coordinates = forCoordinates.clone(),
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

        var eatingStepTiles = findEatingStepTiles(directions, checker.getCoordinates(), checker);

        if (eatingStepTiles.length > 0 && checker.isKing()) {

            var notSortEatingStepTiles = [];

            eatingStepTiles.forEach(tile => {
                if (findEatingStepTiles(directions, tile.getCoordinates(), checker).length > 0) {
                    notSortEatingStepTiles.push(tile);
                }
            });

            if (notSortEatingStepTiles.length > 0) {
                eatingStepTiles = notSortEatingStepTiles;
            }
        }

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