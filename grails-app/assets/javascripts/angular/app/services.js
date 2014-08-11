'use strict';

/* Services */

var playerServices = angular.module('playerServices', ['ngResource']);

playerServices.factory('User', ['$resource',
  function($resource){
    return $resource('user/:name', {}, {
      query: {method:'GET', params:{name:'name'}, isArray:true}
    });
  }]);
