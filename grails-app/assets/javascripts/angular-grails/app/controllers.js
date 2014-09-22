'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('MainCtrl', function ($scope, $sce, $modal, $log, $routeParams, $rootScope, $http, $location, FullJson) {
    $scope.editable = true;
    $scope.fullJson = FullJson.get({login: $routeParams.login});
    $scope.saveJson = function() {
        console.log('call saveJson');
        $http
            .post('user/' + $routeParams.login, $scope.fullJson)
            .success (function(data, status, headers, config) {
                console.log('success saveJson');
            })
            .error(function (data, status, headers, config) {
            });
    };
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };
    $scope.edit = function() {
        var bars = $(".bar");
        if ($scope.editable) {
            for (var i = 0; i < bars.length; i++) {
                bars[i].style.display = "none";
            }
            $scope.editable = false;
        } else {
            for (var i = 0; i < bars.length; i++) {
                bars[i].style.display = "block";
            }
            $scope.editable = true;
        }
    };
    $scope.open = function() {
        var scope = $rootScope.$new();
        scope.sources = $scope.fullJson.sources;
        var addFrameForm = $modal.open({
            templateUrl: 'modal-add-frame.html',
            backdrop: true,
            windowClass: 'modal',
            scope: scope,
            controller: function ($scope, $modalInstance) {
                $scope.submit = function (newFrame) {
                    if (newFrame != null) {
                        $modalInstance.close(newFrame);
                    }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
        addFrameForm.result.then(function (newFrame) {
            newFrame.height = 100;
            newFrame.width = 200;
            newFrame.positionX = 0;
            newFrame.positionY = 0;
            newFrame.sourceType = newFrame.sourceType.value;
            $scope.currentComp.frames = $scope.currentComp.frames.concat(newFrame);
        });
    };
    $log.info($scope);
});