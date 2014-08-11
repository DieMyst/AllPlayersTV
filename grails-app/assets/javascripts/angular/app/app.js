'use strict';

/* App Module */

var playerApp = angular.module('playerApp', [
    'ngRoute',
    'playerControllers',
    'playerServices'
]);

playerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/user/:user', {
                templateUrl: 'partials/frames.html', //todo page
                controller: 'FramesCtrl'
            }).
            otherwise({
                redirectTo: '/user/diemust'
            });
    }]);
