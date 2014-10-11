'use strict';

/* Controllers */

var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('LoginCtrl', function ($scope, $routeParams, $http, $location) {

    $http
        .post('started', null)
        .success (function(data, status, headers, config) {
            console.log('success started');
            /*$location.path("/user/" + $scope.user.login)*/
        })
        .error(function (data, status, headers, config) {
            console.log('error started');
            console.log(status);
        });

    $scope.goToReg = function() {
        $location.path("register");
    };

    $scope.login = function() {
        $http
            .post('api/login', $scope.user)
            .success (function(data, status, headers, config) {
                console.log('success login');
                console.log(status);
                $location.path("/user/" + $scope.user.username)
            })
            .error(function (data, status, headers, config) {
                $scope.error = 'Error when authorized';
                console.log(status);
            });
    };
    $scope.register = function() {
        $http
            .post('register', $scope.user)
            .success (function(data, status, headers, config) {
                console.log('success register');
                $location.path("/user/" + $scope.user.login)
            })
            .error(function (data, status, headers, config) {
                $scope.error = 'Error when registered'
            });
    };
});

playerControllers.controller('MainCtrl', function ($scope, $sce, $modal, $log, $routeParams, $rootScope, $http, $location, FullJson) {
    $scope.menuClass = 'hideMenu';
    $scope.editable = true;
    $scope.fullJson = FullJson.get({login: $routeParams.login});

    $scope.addComp = function(name) {
        var newComposition = {};
        newComposition.name = name;
        newComposition.frames = [];
        console.log(newComposition);
        $scope.fullJson.user.compositions.push(newComposition);

    };

    $scope.saveJson = function() {
        console.log('call saveJson');
        console.log($scope.fullJson);
        $http
            .post('user/' + $routeParams.login, $scope.fullJson)
            .success (function(data, status, headers, config) {
                console.log('success saveJson');
            })
            .error(function (data, status, headers, config) {
            });
    };

    $scope.toggle = function(id) {
        function delay(elem, src, delayTime){
            window.setTimeout(function() {elem.setAttribute("src", src);}, delayTime);
        }
        var el = document.getElementById(id);
        var img = document.getElementById("arrow");
        var box = $scope.menuClass;
        if(box == "hideMenu"){
            $scope.menuClass = 'showMenu';
            delay(img, $scope.fullJson.menuarrow.arrowright, 400);
        }
        else{
            $scope.menuClass = 'hideMenu';
            delay(img, $scope.fullJson.menuarrow.arrowleft, 400);
        }
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
            for (i = 0; i < bars.length; i++) {
                bars[i].style.display = "block";
            }
            $scope.editable = true;
        }
    };

    $scope.open = function() {
        var scope = $rootScope.$new();
        scope.sources = $scope.fullJson.sources;
        scope.types = ['stream', 'chat'];
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
        scope.newFrame = {
            type: scope.types[0],
            sourceType: scope.sources[0]
        };
        addFrameForm.result.then(function (newFrame) {
            newFrame.height = '100px';
            newFrame.width = '200px';
            newFrame.positionX = '0px';
            newFrame.positionY = '0px';
            newFrame.sourceType = newFrame.sourceType.value;
            $scope.currentComp.frames.push(newFrame);
        });
    };
});