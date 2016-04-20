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
        gameType = null,
        onlineRoomId = null,
        checkers = null;

    var moveCheckerToXY = function () {
        },
        selectCheckerXY = function () {
        },
        createSocket = function ($location) {

            window.socket = io.connect('http://' + $location.host() + ':8000');

            window.socket.on('action', function (data) {

                console.log('on action', data);

                switch (data.type) {
                    case 'moveCheckerToXY':
                        moveCheckerToXY(data.params.x, data.params.y, true);
                        break;
                    case 'selectCheckerXY':
                        selectCheckerXY(data.params.x, data.params.y, true);
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

            checkers = new Checkers();

            this.browserIsFirefox = getBrowserName() == "Firefox";

            this.checkers = checkers;
            this.playground = checkers.getPlayground();

            deferred = $q.defer();

            moveCheckerToXY = (x, y, byOpponent) => {
                checkers.moveCheckerToXY(x, y, byOpponent);
                $scope.$apply(function () {
                    deferred.resolve();
                });
            };
            selectCheckerXY = (x, y, byOpponent) => {
                checkers.selectCheckerXY(x, y, byOpponent);
                $scope.$apply(function () {
                    deferred.resolve();
                });
            };

            this.moveCheckerToXY = function (x, y) {

                var isPlayerActive = checkers.isPlayerActive();

                checkers.moveCheckerToXY(x, y);

                if (gameType == 'online' && onlineRoomId != null && isPlayerActive) {
                    var action = {
                        type: 'moveCheckerToXY',
                        params: {x: x, y: y}
                    };

                    console.log('emit action', action);
                    window.socket.emit('action', action);
                }
            };

            this.selectCheckerXY = function (x, y) {

                var isPlayerActive = checkers.isPlayerActive();

                checkers.selectCheckerXY(x, y);

                if (gameType == 'online' && onlineRoomId != null && isPlayerActive) {

                    var action = {
                        type: 'selectCheckerXY',
                        params: {x: x, y: y}
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

                window.socket.on('successConnection', function(){
                    console.log('on successConnection');

                    checkers.setOnlinePlayerType(Checker.getTypeBlack());
                    $scope.$apply(function () {
                        deferred.resolve();
                    });
                });

                window.socket.on('roomDoesNotExists', function(){
                    console.log('on roomDoesNotExists');

                    //@TODO finish it
                });
            }

            if (gameType == null) {
                $uibModal.open({
                    animation: false,
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
                            templateUrl: 'waitingOfOpponent.html',
                            controller: [
                                '$scope',
                                '$uibModalInstance',
                                '$location',
                                function ($scope, $uibModalInstance, $location) {
                                    $scope.url = $location.url();
                                    $scope.roomId = onlineRoomId;

                                    window.socket.on('successConnection', function () {

                                        checkers.setOnlinePlayerType(Checker.getTypeWhite());
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