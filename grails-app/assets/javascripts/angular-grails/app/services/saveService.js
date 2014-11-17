/**
 * Created by diemust on 16.11.2014.
 */

'use strict';
playerApp.factory('saveService', ['$http', '$routeParams', function ($http, $routeParams) {

    var saveServiceFactory = {};

    var _saveUser = function (fullJson) {
        console.log('call saveJson');
        console.log(fullJson);
        $http
            .post('api/user/' + $routeParams.login + "/edit", fullJson)
            .success(function (data, status, headers, config) {
                console.log('success saveJson');

                var message = $("#saveMessage");
                message.show( "fade",
                    200 );
                window.setTimeout(function () {
                    message.hide( "fade",
                        1000 );
                }, 200);
            })
            .error(function (data, status, headers, config) {
            });
    };

    saveServiceFactory.saveUser = _saveUser;

    return saveServiceFactory;
}]);
