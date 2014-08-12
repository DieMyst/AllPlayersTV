'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('FramesCtrl', ['$scope', 'User',
    function ($scope, User) {
        $scope.user = User.query()
    }]);

