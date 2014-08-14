'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('FramesCtrl', ['$scope', '$routeParams', 'User',
    function ($scope, $routeParams, User) {
        $scope.user = User.get({login: $routeParams.login});
    }]);

playerControllers.controller('MainCtrl', function($scope, $sce) {
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
});