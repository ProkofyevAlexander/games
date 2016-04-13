var Coordinates = require('./coordinates'),
    Tile = require('./tile');

module.exports = class Playground {

    constructor() {

        this.playground = [];
        this.tiles = [];

        [0, 1, 2, 3, 4, 5, 6, 7].forEach((x) => {

            this.playground[x] = [];

            [0, 1, 2, 3, 4, 5, 6, 7].forEach((y) => {

                var coordinates = new Coordinates(x, y);

                var tile = new Tile(coordinates, ((x + y) % 2 != 0 ? Tile.getTypeBlack() : Tile.getTypeWhite()));
                this.playground[x][y] = tile;
                this.tiles.push(tile);

            });

        });
    };

    getTiles() {
        return this.tiles;
    }

    getTile(coordinates) {
        return this.playground[coordinates.getX()][coordinates.getY()];
    };

    getTileXY(x, y) {
        return this.playground[x][y];
    };

};