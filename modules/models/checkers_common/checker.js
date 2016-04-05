module.exports = class Checker {

    static getTypeBlack() {
        return 'black';
    }

    static getTypeWhite() {
        return 'white';
    }

    constructor(type, coordinates, available) {
        this.type = type;
        this.coordinates = coordinates;
        this.king = false;
        this.available = available || false;
        this.selected = false;
        this.marked_for_eat = false;
    }

    getType() {
        return this.type;
    };

    setCoordinates(coordinates) {
        this.coordinates = coordinates;
        return this;
    };

    getCoordinates() {
        return this.coordinates;
    };

    setAvailable(available) {
        this.available = available;
        return this;
    };

    isAvailable() {
        return this.available;
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

    setMarkedForEat() {
        this.marked_for_eat = true;
        return this;
    }

    isMarkedForEat() {
        return this.marked_for_eat;
    }

    clone() {

        var checker = new Checker(this.type, this.coordinates);

        checker
            .setSelected(this.selected)
            .setKing(this.king);

        return checker;
    };
};