'use strict';

/* Services */

var playerServices = angular.module('playerServices', ['ngResource']);

playerServices.factory('FullJson', ['$resource',
    function ($resource) {
        return $resource('user/:login', {}, {
            query: {method: 'GET', params: {login: 'diemust'}}
        });
    }]);