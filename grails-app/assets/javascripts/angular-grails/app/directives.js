'use strict';

var playerDirectives = angular.module('playerDirectives', []);

var z = 3;

playerDirectives.directive('resizableDraggable', function () {

    return {
        restrict: 'A',
        link: function (scope, elem) {
            scope.close = function(frames, index) {
                frames.splice(index, 1);
            };
            elem.resizable(
                {
                    resize: function (event, ui) {
                        var newWd = ui.size.width;
                        var newHt = ui.size.height;
                        var frameId = "#" + this.id.replace("edit", "frame");
                        var frame = $(frameId);
                        frame.width(newWd).height(newHt);
                    },
                    stop: function() {
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

                        frame.css({top:  posTop, left: posLeft});
                    },
                    stop: function() {
                        scope.frame.positionY = elem.css('top');
                        scope.frame.positionX = elem.css('left');
                        scope.$apply()
                    }
                }
            );


            if (elem.is('.ui-draggable') || (/absolute/).test(elem.css('position'))) {
                elem.css({position: 'absolute'});
            }
        }
    };
});