'use strict';

var playerDirectives = angular.module('playerDirectives', []);

playerDirectives.directive('resizableDraggable', function () {

    var resizableConfig = {
        resize: function (event, ui) {
            var newWd = ui.size.width - 30;
            var newHt = ui.size.height - 30;
            $(this).parent().width(newWd).height(newHt);
            $(this).parent().find("iframe").width(newWd).height(newHt);
        }
    };

    var draggableConfig = {
        drag: function (event, ui) {
            var posLeft = ui.position.left;
            var posTop = ui.position.top;

            var parentEl = $(this).parent();
            var parentPosTop = parentEl.position().top;
            var parentPosLeft = parentEl.position().left;
            parentEl.css({top:  parentPosTop + posTop, left: parentPosLeft + posLeft});
            $(this).css({top: 0, left: 0});
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