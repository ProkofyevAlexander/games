var Coordinates = require('./coordinates'),
    Tile = require('./tile');

module.exports = class {

    constructor() {

        this.playground = [];

        [0, 1, 2, 3, 4, 5, 6, 7].forEach((x) => {

            this.playground[x] = [];

            [0, 1, 2, 3, 4, 5, 6, 7].forEach((y) => {

                var coordinates = new Coordinates(x, y);

                this.playground[x][y] = new Tile(coordinates, ((x + y) % 2 == 0 ? Tile.getTypeBlack() : Tile.getTypeWhite()));

            });

        });
    };

    getTile(coordinates) {
        return this.playground[coordinates.getX()][coordinates.getY()];
    };

    getTileXY(x, y) {
        return this.playground[x][y];
    };

};