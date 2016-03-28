module.exports = class Tile {

    static getTypeBlack() {
        return 'black';
    }

    static getTypeWhite() {
        return 'white';
    }

    constructor(coordinates, type) {
        this.coordinates = coordinates;
        this.type = type;
        this.checker = null;
        this.available = false;
        this.tileWithCheckerForEat = null;
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

    setTileWithCheckerForEat(tile) {
        this.tileWithCheckerForEat = tile;
        return this;
    }

    activateEating() {
        var was_eating = false;
        if (this.tileWithCheckerForEat != null) {
            this.tileWithCheckerForEat.setChecker(null);
            was_eating = true;
        }
        this.tileWithCheckerForEat = null;
        return was_eating;
    }
};