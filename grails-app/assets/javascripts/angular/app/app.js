'use strict';

/* App Module */

var playersApp = angular.module('playersApp', [
  'ngRoute',
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/frames/:user', {
        templateUrl: '', //todo page
        controller: ''
      }).
      otherwise({
        redirectTo: '/phones' //todo
      });
  }]);
