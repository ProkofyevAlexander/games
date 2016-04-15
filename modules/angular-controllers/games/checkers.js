var Checkers = require('../../models/checkers');

define(['app'], function (app) {


    // Get from: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
    var getBrowserName = () => {

        var
            aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
            sUsrAg = navigator.userAgent, nIdx = aKeys.length - 1;

        for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);

        return aKeys[nIdx];
    };

    app.controller('CheckersController', ['$scope', function ($scope) {

        var checkers = new Checkers();

        this.browserIsFirefox = getBrowserName() == "Firefox";

        this.checkers = checkers;
        this.playground = checkers.getPlayground();

    }]);
});