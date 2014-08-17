'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('FramesCtrl', ['$scope', '$routeParams', 'User',
    function ($scope, $routeParams, User) {
        $scope.user = User.get({login: $routeParams.login});
    }]);

playerControllers.controller('MainCtrl', function ($scope, $sce, $modal, $log) {
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
            $scope.composition = $scope.composition.concat(newFrame);
            $log.info($scope.newFrame);
        });
    };
    $log.info($scope);
});