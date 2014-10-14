//= require angular/angular
//= require_tree angular/modules
//= require_self
//= require_tree controllers
//= require_tree services
//= require directives
//= require config-app
//= require run-app
//= require_tree player-app

'use strict';

/* App Module */

var playerApp = angular.module('playerApp', [
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'playerDirectives',
    'ui.bootstrap',
    'LocalStorageModule'
]);


