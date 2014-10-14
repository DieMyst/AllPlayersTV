'use strict';

playerApp.factory('ordersService', ['$resource',
    function ($resource) {
        return $resource('api/user/:login', {}, {
            query: {method: 'GET'}
        });
    }
]);