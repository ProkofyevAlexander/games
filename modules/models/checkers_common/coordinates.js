module.exports = class Coordinates {

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

    add(direction) {
        this.x += direction.getX();
        this.y += direction.getY();
    };

    isValid() {
        return this.x > -1 && this.x < 8 && this.y > -1 && this.y < 8;
    };
};
