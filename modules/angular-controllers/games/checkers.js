var Checkers = require('../../models/checkers');

module.exports = function ($scope, $element, $attrs) {

    var checkers = new Checkers();

    this.checkers = checkers;
    this.playground = checkers.getPlayground();
};