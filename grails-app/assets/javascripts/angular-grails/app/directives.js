'use strict';

var playerDirectives = angular.module('playerDirectives', []);

playerDirectives.directive('resizableDraggable', function () {

    var resizableConfig = {
        resize: function (event, ui) {
            var newWd = ui.size.width - 30;
            var newHt = ui.size.height - 30;
            ui.element.find("iframe").width(newWd).height(newHt);
        }
    };

    return {
        restrict: 'A',
        scope: {
            callback: '&onResize'
        },
        link: function postLink(scope, elem) {
            elem.resizable(resizableConfig).draggable();
        }
    };
});