'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('FramesCtrl', ['$scope', '$routeParams', 'User',
    function ($scope, $routeParams, User) {
        $scope.user = User.get({login: $routeParams.login});
    }]);

playerControllers.controller('MainCtrl', function ($scope, $sce, $modal) {
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.open = function () {

        $modal.open({
            templateUrl: 'modal-add-frame.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance) {
                $scope.submit = function () {
                    //todo add frame
                    $modalInstance.dismiss('cancel');
                };
                $scope.cancel = function () {
                    //$modalInstance.dismiss('cancel');
                };
            },
            resolve: {

            }
        });
    };
});