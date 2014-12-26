'use strict';

var playerDirectives = angular.module('playerDirectives', []);
'use strict';
var z = 3;

playerDirectives.directive('resizableDraggable', [function () {

    return {
        restrict: 'A',
        scope: {
            frame: '=frame'
        },
        link: function (scope, elem) {

            elem.resizable(
                {
                    resize: function (event, ui) {
                        var newWd = ui.size.width;
                        var newHt = ui.size.height;
                        var frameId = "#" + this.id.replace("edit", "frame");
                        var frame = $(frameId);
                        frame.width(newWd).height(newHt);
                    },
                    stop: function () {
                        scope.frame.width = elem.css('width');
                        scope.frame.height = elem.css('height');
                        scope.$apply();
                    }
                }
            ).draggable(
                {
                    start: function () {
                        var frameId = "#" + this.id.replace("edit", "frame");
                        var frame = $(frameId);

                        frame.addClass('top').removeClass('bottom');
                        frame.siblings().removeClass('top').addClass('bottom');
                        frame.css("z-index", z);

                        $(this).addClass('top').removeClass('bottom');
                        $(this).siblings().removeClass('top').addClass('bottom');
                        $(this).css("z-index", z++);
                    },
                    drag: function (event, ui) {
                        var posLeft = ui.position.left;
                        var posTop = ui.position.top;

                        var frameId = "#" + this.id.replace("edit", "frame");
                        var frame = $(frameId);

                        frame.css({top: posTop, left: posLeft});
                    },
                    stop: function () {
                        scope.frame.positionY = elem.css('top');
                        scope.frame.positionX = elem.css('left');
                        scope.$apply();
                    },
                    snap: ".bar,html",
                    stack: ".outer",
                    snapTolerance: 10
                }
            );


            if (elem.is('.ui-draggable') || (/absolute/).test(elem.css('position'))) {
                elem.css({position: 'absolute'});
            }
            if (scope.$parent.editable == false) {
                elem.display = 'none';
            }
        }
    };
}]);

playerDirectives.directive('userValidation', [function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (username) {
                if (/^[a-zA-Zа-яА-Я0-9_-]{3,16}$/.test(username)) {
                    ctrl.$setValidity('username', true);
                    return username;
                } else {
                    ctrl.$setValidity('username', false);
                    return undefined;
                }
            });
        }
    }
}]);
