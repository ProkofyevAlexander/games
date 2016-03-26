module.exports = class Checker {

    static getTypeBlack() {
        return 'black';
    }

    static getTypeWhite() {
        return 'white';
    }

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

        return checker;
    };
};