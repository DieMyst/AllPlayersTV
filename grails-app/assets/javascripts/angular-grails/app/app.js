//= require angular/angular
//= require_tree angular/modules
//= require_self
//= require controllers
//= require services
//= require_self
//= require_tree player-app

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
            when('/', {
                templateUrl: 'frames.html',
                controller: 'FramesCtrl'
            }).
            when('/user/:user', {
                templateUrl: 'frames.html',
                controller: 'FramesCtrl'
            }).
            otherwise({
                redirectTo: ''
            });
    }]);
