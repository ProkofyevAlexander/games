var Checkers = require('../../models/checkers'),
    Checker = require('../../models/checkers_common/checker');
//var initialStates = require('../../tests/checkers-initial-states');

define(['app'], function (app) {

    // Get from: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
    var getBrowserName = () => {

        var
            aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
            sUsrAg = navigator.userAgent, nIdx = aKeys.length - 1;

        for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--) {
        }

        return aKeys[nIdx];
    };

    var deferred = null,
        gameType = null,
        onlineRoomId = null,
        checkers = null,
        winner = null,
        opponentIsReadyToPlayAgain = false,
        $gameIsFinishedModal = null,
        $waitingOfOpponentDecisionModal = null,
        createSocket = () => {
        };

    var getSocketCreator = ($scope, $location, $uibModal) => {

        return () => {

            window.socket = io.connect('http://' + $location.host() + ':8000');

            window.socket.on('action', function (data) {

                //console.log('on action', data);

                switch (data.type) {

                    case 'checkersState':

                        checkers.importState(data.data);

                        $scope.$apply(function () {
                            deferred.resolve();
                        });

                        winner = data.data.winner;

                        checkOnWinner($uibModal);
                        break;

                    case 'readyToPlayAgain':

                        opponentIsReadyToPlayAgain = true;

                        if ($waitingOfOpponentDecisionModal != null) {
                            $waitingOfOpponentDecisionModal.dismiss();
                        }

                        break;

                    default:
                        console.log('Undefined action: ', data.type);
                }
            });

            window.socket.on('roomCreated', function (data) {

                //console.log('on roomCreated', data);

                onlineRoomId = data.roomId;

                $uibModal.open({
                    animation: false,
                    backdrop: false,
                    templateUrl: 'waitingOfOpponent.html',
                    controller: 'WaitingOfOpponentController'
                });
            });

            window.socket.on('roomDoesNotExists', function () {

                //console.log('on roomDoesNotExists');

                $uibModal.open({
                    animation: false,
                    backdrop: false,
                    templateUrl: 'roomDoesNotExists.html',
                    controller: 'RoomDoesNotExistController'
                });
            });

            window.socket.on('roomIsClosed', function () {

                //console.log('on roomIsClosed');

                if ($waitingOfOpponentDecisionModal != null) {
                    $waitingOfOpponentDecisionModal.dismiss();
                }

                if ($gameIsFinishedModal != null) {
                    $gameIsFinishedModal.dismiss();
                }

                $uibModal.open({
                    animation: false,
                    backdrop: false,
                    templateUrl: 'roomIsClosed.html',
                    controller: 'RoomDoesNotExistController'
                });
            });
        }
    };

    var checkOnWinner = ($uibModal) => {

        if (checkers.getWinner() != null) {

            opponentIsReadyToPlayAgain = false;

            $gameIsFinishedModal = $uibModal.open({
                animation: false,
                backdrop: false,
                templateUrl: 'gameIsFinished.html',
                controller: 'GameIsFinishedController'
            });

            if (winner == null && gameType == 'online') {

                winner = checkers.getWinner();

                var action = {
                    type: 'checkersState',
                    data: checkers.exportState()
                };

                //console.log('emit action', action);
                window.socket.emit('action', action);
            }
        }
    };

    app.controller('CheckersController', [
        '$scope',
        '$q',
        '$uibModal',
        '$route',
        '$location',
        function ($scope, $q, $uibModal, $route, $location) {

            createSocket = getSocketCreator($scope, $location, $uibModal);

            winner = null;

            checkers = new Checkers();

            this.browserIsFirefox = getBrowserName() == "Firefox";

            this.checkers = checkers;
            this.playground = checkers.getPlayground();

            //@TO DO DELETE: just for testing
            //checkers.importState(initialStates.twoCheckers);

            deferred = $q.defer();

            this.moveCheckerToXY = function (x, y) {

                if (!checkers.isPlayerActive()) return false;

                checkers.moveCheckerToXY(x, y);

                if (gameType == 'online' && onlineRoomId != null) {
                    var action = {
                        type: 'checkersState',
                        data: checkers.exportState()
                    };

                    //console.log('emit action', action);
                    window.socket.emit('action', action);
                }

                checkOnWinner($uibModal);
            };

            this.selectCheckerXY = function (x, y) {

                if (!checkers.isPlayerActive()) return false;

                checkers.selectCheckerXY(x, y);

                if (gameType == 'online' && onlineRoomId != null) {

                    var action = {
                        type: 'checkersState',
                        data: checkers.exportState()
                    };

                    //console.log('emit action', action);
                    window.socket.emit('action', action);
                }
            };

            if ($route.current.params.roomId) {

                gameType = 'online';
                onlineRoomId = $route.current.params.roomId;

                createSocket();

                window.socket.on('connect', function () {

                    //console.log('on connect');

                    //console.log('emit connectTo', {roomId: onlineRoomId});
                    window.socket.emit('connectTo', {roomId: onlineRoomId});
                });

                window.socket.on('successConnection', function () {
                    //console.log('on successConnection');

                    checkers.setOnlinePlayer(Checker.getTypeBlack());
                    $scope.$apply(function () {
                        deferred.resolve();
                    });
                });
            }

            if (gameType == null) {
                $uibModal.open({
                    animation: false,
                    backdrop: false,
                    templateUrl: 'changeGameType.html',
                    controller: 'ChangeGameTypeController'
                });
            }

        }]);

    app.controller('ChangeGameTypeController', [
        '$scope',
        '$uibModalInstance',
        '$route',
        function ($scope, $uibModalInstance, $route) {

            $scope.gameType = 'local';

            $scope.continue = function () {

                $uibModalInstance.dismiss();

                gameType = $scope.gameType;

                if (gameType == 'online') {

                    createSocket();

                    window.socket.on('connect', function () {

                        //console.log('on connect');

                        //console.log('emit createRoom');
                        window.socket.emit('createRoom', {});
                    });
                }
            };

            $scope.$on('$routeChangeStart', function (next, current) {
                $uibModalInstance.dismiss();
            });
        }]);

    app.controller('WaitingOfOpponentController', [
        '$scope',
        '$uibModalInstance',
        '$location',
        function ($scope, $uibModalInstance, $location) {

            $scope.url = $location.url();
            $scope.roomId = onlineRoomId;

            window.socket.on('successConnection', function () {

                //console.log('on successConnection');

                checkers.setOnlinePlayer(Checker.getTypeWhite());
                $scope.$apply(function () {
                    deferred.resolve();
                });

                $uibModalInstance.dismiss();
            });
        }]);

    app.controller('GameIsFinishedController', [
        '$scope',
        '$uibModal',
        '$uibModalInstance',
        '$location',
        function ($scope, $uibModal, $uibModalInstance, $location) {

            $scope.winnerColor =
                checkers.getWinner().charAt(0).toUpperCase() +
                checkers.getWinner().slice(1);

            $scope.finishGame = function () {

                $gameIsFinishedModal = null;

                $uibModalInstance.dismiss();

                if (gameType == 'online') {
                    window.socket.disconnect();
                }

                //@TODO Fix it: use selected locale
                $location.path('/en/');
            };

            $scope.playAgain = function () {

                $gameIsFinishedModal = null;

                $uibModalInstance.dismiss();

                winner = null;
                checkers.setInitialState();

                if (gameType == 'online') {

                    var action = {
                        type: 'readyToPlayAgain',
                        data: {}
                    };

                    //console.log('emit action', action);
                    window.socket.emit('action', action);

                    $waitingOfOpponentDecisionModal = null;

                    if (!opponentIsReadyToPlayAgain) {

                        $waitingOfOpponentDecisionModal = $uibModal.open({
                            animation: false,
                            backdrop: false,
                            templateUrl: 'wainingOpponentDecision.html',
                            controller: 'RoomDoesNotExistController'
                        });
                    }
                }
            }
        }]);

    app.controller('RoomDoesNotExistController', [
        '$scope',
        '$uibModal',
        '$uibModalInstance',
        '$location',
        function ($scope, $uibModal, $uibModalInstance, $location) {

            $scope.goToMainPage = function () {

                $uibModalInstance.dismiss();

                window.socket.disconnect();

                //@TODO Fix it: use selected locale
                $location.path('/en/');
            };

            $scope.startNewGame = function () {

                $uibModalInstance.dismiss();

                window.socket.disconnect();

                gameType = null;
                onlineRoomId = null;
                winner = null;

                checkers.setInitialState();

                $uibModal.open({
                    animation: false,
                    backdrop: false,
                    templateUrl: 'changeGameType.html',
                    controller: 'ChangeGameTypeController'
                });

                //@TODO Fix it: use selected locale
                $location.path('/en/games/checkers/');
            };
        }]);
});