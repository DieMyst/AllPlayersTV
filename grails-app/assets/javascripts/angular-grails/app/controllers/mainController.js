'use strict';

playerApp.controller('MainCtrl', ['$scope', '$sce', '$modal', '$log', '$routeParams', '$rootScope', '$http', '$location', 'authService', 'saveService',
    function ($scope, $sce, $modal, $log, $routeParams, $rootScope, $http, $location, authService, saveService) {
        $scope.menuClass = 'showMenu';
        $scope.editable = false;
        $scope.fullJson = "";
        authService.getFullJson($routeParams.login).then(function(response) {
            $scope.fullJson = response;
        });

        $scope.logOut = function () {
            authService.logOut();
            $location.path("/login");
        };

        $scope.logIn = function () {
            $location.path("/login");
        };

        $scope.deleteComp = function () {
            var index = $scope.fullJson.user.compositions.indexOf($scope.currentComp);
            $scope.fullJson.user.compositions.splice(index, 1);
            $scope.currentComp = null;
        };

        $scope.saveJson = function() {
            saveService.saveUser($scope.fullJson);
        }

        $scope.toggle = function (id) {
            function delay(elem, src, delayTime) {
                window.setTimeout(function () {
                    elem.setAttribute("src", src);
                }, delayTime);
            }

            var box = $("#box");
            var img = document.getElementById(id);
            if (box.hasClass("hideMenu")) {
                box.switchClass('hideMenu', 'showMenu', 0, 'none');
                $('#deco').show( "drop",
                    {direction: "down"}, 400 );
                delay(img, $scope.fullJson.menuarrow.arrowdown, 400);
            }
            else {
                $('#deco').hide( "drop",
                    {direction: "down"}, 400 );
                delay(img, $scope.fullJson.menuarrow.arrowup, 400);
                box.switchClass('showMenu', 'hideMenu', 0, 'none');
            }

        };

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.edit = function () {
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

        $scope.addComp = function() {
            var addCompForm = $modal.open({
                templateUrl: 'modal-add-composition.html',
                backdrop: true,
                windowClass: 'modal',
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.submit = function (newComp) {
                        if (newComp != null) {
                            $modalInstance.close(newComp);
                        }
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
            addCompForm.result.then(function (newComp) {
                newComp.frames = [];
                $scope.fullJson.user.compositions.push(newComp);
                $scope.currentComp = newComp;
            });
        };

        $scope.open = function () {
            var scope = $rootScope.$new();
            scope.sources = $scope.fullJson.sources;
            scope.types = ['stream', 'chat'];
            $scope.addFrameForm = $modal.open({
                templateUrl: 'modal-add-frame.html',
                backdrop: true,
                windowClass: 'modal',
                scope: scope,
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.submit = function (newFrame) {
                        if (newFrame != null) {
                            $modalInstance.close(newFrame);
                        }
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                    $scope.updateSource = function() {
                        if ($scope.newFrame.sourceType.stream == false) {
                            $scope.newFrame.type = "chat";
                        }
                    };
                }]
            });
            scope.newFrame = {
                type: scope.types[0],
                sourceType: scope.sources[0]
            };
            $scope.addFrameForm.result.then(function (newFrame) {
                newFrame.height = '100px';
                newFrame.width = '200px';
                newFrame.positionX = '0px';
                newFrame.positionY = '0px';
                newFrame.sourceType = newFrame.sourceType.value;
                $scope.currentComp.frames.push(newFrame);
            });
        };

        $scope.copyComp = function() {
            $http
                .post("api/user/copy", $scope.currentComp)
                .success(function (data, status, headers, config) {
                    console.log('success copyJson');
                })
                .error(function (data, status, headers, config) {
                });
        };

        $scope.renameComp = function () {
            var rename = $modal.open({
                templateUrl: 'modal-add-composition.html',
                backdrop: true,
                windowClass: 'modal',
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.submit = function (input) {
                        if (input != null) {
                            $modalInstance.close(input);
                        }
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
            rename.result.then(function (input) {
                $scope.currentComp.name = input.name;
            });
        };

        $(document).bind('keydown', 'space', function(){
            $scope.toggle('arrow');
        });

        $(document).bind('keydown', 'e', function(){
            if ($scope.fullJson.canEdit === true && $scope.currentComp != null) {
                $scope.edit();
            }
        });

        $(document).bind('keydown', 's', function(){
            if ($scope.fullJson.canEdit === true) {
                $scope.saveJson();
            }
        });

        $(document).bind('keydown', 'a', function(){
            if ($scope.fullJson.canEdit === true && $scope.currentComp != null) {
                $scope.open();
            }
        });

    }]);