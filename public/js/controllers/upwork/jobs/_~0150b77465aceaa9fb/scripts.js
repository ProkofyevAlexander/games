/**
 * Created by Alexander on 18.04.2016.
 */

define(['app'], function (app) {

    if (!Array.prototype.remove) {
        Array.prototype.remove = function(val) {
            var i = this.indexOf(val);
            return i>-1 ? this.splice(i, 1) : [];
        };
    }

    app.controller('PageController', ['$scope', function($scope){
        $scope.addresses = [
            {val: ''},
            {val: '123 Main str'}
        ];

        $scope.removeAddress = function (index) {
            console.log('Remove', index);
            $scope.addresses.splice(index, 1);
        };

        $scope.addAddress = function () {
            $scope.addresses.push({val:''});
        }
    }]);

});