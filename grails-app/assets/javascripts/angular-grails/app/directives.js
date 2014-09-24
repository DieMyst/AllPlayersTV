'use strict';

var playerDirectives = angular.module('playerDirectives', []);

var z = 3;

playerDirectives.directive('resizableDraggable', function () {

    return {
        restrict: 'A',
        link: function (scope, elem) {
            elem.resizable(
                {
                    resize: function (event, ui) {
                        var newWd = ui.size.width;
                        var newHt = ui.size.height;
                        var frameId = "#" + this.id.replace("edit", "frame");
                        var frame = $(frameId);
                        frame.width(newWd).height(newHt);
                        scope.$digest();
                    },
                    stop: function() {
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
                        scope.$digest();
                    },
                    stop: function() {
                        scope.$apply();
                    }
                }
            );


            if (elem.is('.ui-draggable') || (/absolute/).test(elem.css('position'))) {
                elem.css({position: 'absolute'});
            }
            scope.$watch(function() {
                return {
                    top: elem.css('top'),
                    left: elem.css('left'),
                    height: elem.css('height'),
                    width: elem.css('width')
                }
            }, styleChangeFn, true);

            function styleChangeFn(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.frame.positionY = newValue.top;
                    scope.frame.positionX = newValue.left;
                    scope.frame.width = newValue.width;
                    scope.frame.height = newValue.height;
                }
            }
        }
    };
});