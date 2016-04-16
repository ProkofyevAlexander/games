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

    var gameType = null;

    app.controller('CheckersController', ['$scope', '$uibModal', function ($scope, $uibModal) {

        var checkers = new Checkers();

        this.browserIsFirefox = getBrowserName() == "Firefox";

        this.checkers = checkers;
        this.playground = checkers.getPlayground();

        if (gameType == null) {
            $uibModal.open({
                animation: false,
                templateUrl: 'changeGameType.html',
                controller: 'GameTypeFormController'
            });
        }

    }]);

    app.controller('GameTypeFormController', ['$scope', '$uibModalInstance', '$route', function ($scope, $uibModalInstance, $route) {
        $scope.gameType = 'local';
        $scope.continue = function() {
            gameType = $scope.gameType;
            $uibModalInstance.close($scope.gameType);
        };
        $scope.$on('$routeChangeStart', function(next, current) {
            $uibModalInstance.dismiss();
        });
    }]);
});