//= require angular/angular
//= require_tree angular/modules
//= require_self
//= require controllers
//= require services
//= require directives
//= require_self
//= require_tree player-app

'use strict';

/* App Module */

var playerApp = angular.module('playerApp', [
    'ngRoute',
    'ngSanitize',
    'playerControllers',
    'playerServices',
    'playerDirectives',
    'ui.bootstrap'
]);

playerApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'frames.html',
                controller: 'MainCtrl'
            }).
            when('/user/:login', {
                templateUrl: 'frames.html',
                controller: 'MainCtrl'
            }).
            otherwise({
                redirectTo: ''
            });
    }]);
