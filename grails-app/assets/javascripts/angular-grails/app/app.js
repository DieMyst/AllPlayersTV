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
                controller: 'StartedCtrl'
            }).
            when('/register', {
                templateUrl: 'register.html',
                controller: 'LoginCtrl'
            }).
            when('/login', {
                templateUrl: 'login.html',
                controller: 'LoginCtrl'
            }).
            when('/user/:login', {
                templateUrl: 'frames.html',
                controller: 'MainCtrl'
            }).
            otherwise({
                redirectTo: ''
            });
    }]);
