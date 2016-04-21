var Checkers = require('../../models/checkers'),
    Checker = require('../../models/checkers_common/checker');

define(['app'], function (app) {

    // Get from: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
    var getBrowserName = () => {

        var
            aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
            sUsrAg = navigator.userAgent, nIdx = aKeys.length - 1;

        for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);

        return aKeys[nIdx];
    };

    var deferred = null,
        $controllerScope = null,
        gameType = null,
        onlineRoomId = null,
        checkers = null;

    var createSocket = function ($location) {

        window.socket = io.connect('http://' + $location.host() + ':8000');

        window.socket.on('action', function (data) {

            console.log('on action', data);

            switch (data.type) {

                case 'checkersState':

                    checkers.importState(data.data);

                    $controllerScope.$apply(function () {
                        deferred.resolve();
                    });

                    break;

                default:
                    console.log('Undefined action: ', data.type);
            }
        });
    };

    app.controller('CheckersController', [
        '$scope',
        '$q',
        '$uibModal',
        '$route',
        '$location',
        function ($scope, $q, $uibModal, $route, $location) {

            $controllerScope = $scope;

            checkers = new Checkers();

            this.browserIsFirefox = getBrowserName() == "Firefox";

            this.checkers = checkers;
            this.playground = checkers.getPlayground();

            deferred = $q.defer();

            this.moveCheckerToXY = function (x, y) {

                if (!checkers.isPlayerActive()) return false;

                checkers.moveCheckerToXY(x, y);

                if (gameType == 'online' && onlineRoomId != null) {
                    var action = {
                        type: 'checkersState',
                        data: checkers.exportState()
                    };

                    console.log('emit action', action);
                    window.socket.emit('action', action);
                }
            };

            this.selectCheckerXY = function (x, y) {

                if (!checkers.isPlayerActive()) return false;

                checkers.selectCheckerXY(x, y);

                if (gameType == 'online' && onlineRoomId != null) {

                    var action = {
                        type: 'checkersState',
                        data: checkers.exportState()
                    };

                    console.log('emit action', action);
                    window.socket.emit('action', action);
                }
            };

            if ($route.current.params.roomId) {

                gameType = 'online';
                onlineRoomId = $route.current.params.roomId;

                createSocket($location);

                window.socket.on('connect', function () {

                    console.log('on connect');

                    console.log('emit connectTo', {roomId: onlineRoomId});
                    window.socket.emit('connectTo', {roomId: onlineRoomId});
                });

                window.socket.on('successConnection', function () {
                    console.log('on successConnection');

                    checkers.setOnlinePlayer(Checker.getTypeBlack());
                    $scope.$apply(function () {
                        deferred.resolve();
                    });
                });

                window.socket.on('roomDoesNotExists', function () {
                    console.log('on roomDoesNotExists');

                    //@TODO finish it
                });
            }

            if (gameType == null) {
                $uibModal.open({
                    animation: false,
                    backdrop: false,
                    templateUrl: 'changeGameType.html',
                    controller: 'GameTypeFormController'
                });
            }

        }]);

    app.controller('GameTypeFormController', [
        '$scope',
        '$uibModalInstance',
        '$route',
        '$uibModal',
        '$location',
        function ($scope, $uibModalInstance, $route, $uibModal, $location) {

            $scope.gameType = 'local';
            $scope.continue = function () {

                gameType = $scope.gameType;
                $uibModalInstance.close($scope.gameType);

                if (gameType == 'online') {

                    createSocket($location);

                    window.socket.on('connect', function () {

                        console.log('on connect');

                        if (onlineRoomId == null) {
                            console.log('emit createRoom');
                            window.socket.emit('createRoom', {});
                        }
                    });

                    window.socket.on('roomCreated', function (data) {

                        console.log('on roomCreated', data);

                        onlineRoomId = data.roomId;
                        $uibModal.open({
                            animation: false,
                            backdrop: false,
                            templateUrl: 'waitingOfOpponent.html',
                            controller: [
                                '$scope',
                                '$uibModalInstance',
                                '$location',
                                function ($scope, $uibModalInstance, $location) {
                                    $scope.url = $location.url();
                                    $scope.roomId = onlineRoomId;

                                    window.socket.on('successConnection', function () {

                                        checkers.setOnlinePlayer(Checker.getTypeWhite());
                                        $scope.$apply(function () {
                                            deferred.resolve();
                                        });

                                        console.log('on successConnection', data);

                                        $uibModalInstance.dismiss();
                                    })
                                }]
                        });
                    });
                }
            };
            $scope.$on('$routeChangeStart', function (next, current) {
                $uibModalInstance.dismiss();
            });
        }]);
});