'use strict';

playerApp.controller('MainCtrl', ['$scope', '$sce', '$modal', '$log', '$routeParams', '$rootScope', '$http', '$location', 'authService', 'saveService', 'translitService',
    function ($scope, $sce, $modal, $log, $routeParams, $rootScope, $http, $location, authService, saveService, translitService) {
        $scope.fullJson = "";
        authService.getFullJson($routeParams.login).then(function (response) {
            $scope.fullJson = response;
            if ($routeParams.comp != undefined) {
                angular.forEach($scope.fullJson.user.compositions, function(value) {
                    if (translitService.translit(value.name) === $routeParams.comp) {
                        $scope.currentComp = value;
                    }
                });
            }
            if ($routeParams.hiddenMenu === "true") {
                $scope.menuClass = 'hideMenu';
                $('#deco').css("display", "none");
                $scope.arrow = $scope.fullJson.menuarrow.arrowup
            } else {
                $scope.menuClass = 'showMenu';
                $('#deco').css("display", "block");
                $scope.arrow = $scope.fullJson.menuarrow.arrowdown
            }
        });

        $scope.editable = $scope.fullJson.isLogged;

        $scope.logOut = function () {
            authService.logOut();
            $location.path("/login");
        };

        var autoSaving = function () {
            if ($scope.fullJson.user.autoSave == true) {
                saveService.saveUser($scope.fullJson);
            }
        };

        $scope.$watch("fullJson.user.compositions", function (newValue, oldValue) {
            if (!isUndefined(oldValue)) {
                autoSaving();
            }
        }, true);

        $scope.close = function (frames, index) {
            frames.splice(index, 1);
        };

        $scope.logIn = function () {
            authService.clearRouteParams();
            $location.path("/login");
        };

        $scope.deleteComp = function () {
            var index = $scope.fullJson.user.compositions.indexOf($scope.currentComp);
            $scope.fullJson.user.compositions.splice(index, 1);
            $scope.currentComp = null;
        };

        $scope.saveJson = function () {
            saveService.saveUser($scope.fullJson);
        };

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
                $('#deco').show("drop",
                    {direction: "down"}, 400);
                delay(img, $scope.fullJson.menuarrow.arrowdown, 400);
            }
            else {
                $('#deco').hide("drop",
                    {direction: "down"}, 400);
                delay(img, $scope.fullJson.menuarrow.arrowup, 400);
                box.switchClass('showMenu', 'hideMenu', 0, 'none');
            }

        };

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.getSourceTemplate = function(source, type) {
            var sourceName;
            switch (source) {
                case 0:
                    sourceName = 'twitch';
                    break;
                case 1:
                    sourceName = 'gg';
                    break;
                case 2:
                    sourceName = 'cybergame';
                    break;
                case 3:
                    sourceName = 'sc2tv';
                    break;
                case 4:
                    sourceName = 'hitbox';
                    break;
            }
            return sourceName + '-' + type + '.html';
        };

        $scope.edit = function () {
            $scope.editable = !$scope.editable;
        };

        $scope.addComp = function () {
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
                $scope.updateComp(newComp.name);
            });
        };

        $scope.openModalAddFrame = function () {
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
                    $scope.updateSource = function () {
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

        $scope.copyComp = function () {
            $http
                .post("api/user/copy", $scope.currentComp)
                .success(function (data, status, headers, config) {
                    console.log('success copyJson');
                })
                .error(function (data, status, headers, config) {
                });
        };

        $scope.updateComp = function() {
            translitService.changeLink($scope.currentComp.name);
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

        $(document).bind('keydown', 'space', function () {
            $scope.toggle('arrow');
        });

        $(document).bind('keydown', 'e', function () {
            if ($scope.currentComp != null) {
                $scope.edit();
                $scope.$digest();
            }
        });
        $(document).bind('keydown', 'у', function () {
            if ($scope.currentComp != null) {
                $scope.edit();
                $scope.$digest();
            }
        });

        $(document).bind('keydown', 's', function () {
            if ($scope.fullJson.canEdit === true) {
                $scope.saveJson();
            }
        });
        $(document).bind('keydown', 'ы', function () {
            if ($scope.fullJson.canEdit === true) {
                $scope.saveJson();
            }
        });

        $(document).bind('keydown', 'a', function () {
            if ($scope.fullJson.canEdit === true && $scope.currentComp != null) {
                $scope.open();
            }
        });
        $(document).bind('keydown', 'ф', function () {
            if ($scope.fullJson.canEdit === true && $scope.currentComp != null) {
                $scope.open();
            }
        });

    }]);