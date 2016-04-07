var Checkers = require('../models/checkers');

define(['app'], function (app) {

    app.controller('CheckersController', ['$scope', function ($scope) {

        var checkers = new Checkers();

        this.checkers = checkers;
        this.playground = checkers.getPlayground();

    }]);
});