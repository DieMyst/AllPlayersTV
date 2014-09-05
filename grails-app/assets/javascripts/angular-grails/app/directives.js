'use strict';

var playerDirectives = angular.module('playerDirectives', []);

var z = 3;

playerDirectives.directive('resizableDraggable', function () {

    var resizableConfig = {
        resize: function (event, ui) {
            var newWd = ui.size.width;
            var newHt = ui.size.height;
            var frameId = "#" + this.id.replace("edit", "frame");
            var frame = $(frameId);
            frame.width(newWd).height(newHt);
        }
    };

    var draggableConfig = {
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
        }
    };

    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem) {
            elem.resizable(resizableConfig).draggable(draggableConfig);
            if (elem.is('.ui-draggable') || (/absolute/).test(elem.css('position'))) {
                elem.css({position: 'absolute'});
            }
        }
    };
});