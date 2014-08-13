'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('FramesCtrl', ['$scope', '$routeParams', 'User',
    function ($scope, $routeParams, User) {
        $scope.user = User.get({login: $routeParams.login});
    }]);

playerControllers.controller('MainCtrl', function($scope, $sce) {
    $scope.load = function() {
        $(".outer").resizable({
            resize: function (event, ui) {
                var newWd = ui.size.width - 20;
                var newHt = ui.size.height - 20;
                $("iframe").width(newWd).height(newHt);
            }
        }).draggable();
    };
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
});