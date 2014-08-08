'use strict';

/* App Module */

var playersApp = angular.module('playersApp', [
  'ngRoute'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/frames/:user', {
        templateUrl: 'partials/frames.html', //todo page
        controller: 'FramesCtrl'
      }).
      otherwise({
        redirectTo: '/phones' //todo
      });
  }]);
