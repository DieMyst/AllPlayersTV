'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('MainCtrl', function ($scope, $sce, $modal, $log, $routeParams, User) {
    $scope.user = User.get({login: $routeParams.login});
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };
    $scope.open = function () {
        var addFrameForm = $modal.open({
            templateUrl: 'modal-add-frame.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance) {
                $scope.submit = function (newFrame) {
                    $modalInstance.close(newFrame);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
        var res = addFrameForm.result.then(function (newFrame) {
            newFrame.height = 100;
            newFrame.width = 200;
            newFrame.positionX = 0;
            newFrame.positionY = 0;
            $scope.currentComp.frames = $scope.currentComp.frames.concat(newFrame);
            $log.info($scope.newFrame);
        });
    };
    $log.info($scope);
});