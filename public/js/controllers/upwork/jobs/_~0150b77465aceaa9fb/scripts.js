/**
 * Created by Alexander on 18.04.2016.
 */

define(['app'], function (app) {

    app.controller('PageController', ['$scope', function($scope){
        $scope.addresses = [
            {val: ''},
            {val: '123 Main str'}
        ];

        $scope.removeAddress = function (index) {
            $scope.addresses.splice(index, 1);
        };

        $scope.addAddress = function () {
            $scope.addresses.push({val:''});
        }
    }]);

});