'use strict';


define(function () {

    return function (module) {
        module.controller('InitController', ['$scope', function ($scope) {
            $scope.name = 'Hello express angular';
        }]);
    }
});
