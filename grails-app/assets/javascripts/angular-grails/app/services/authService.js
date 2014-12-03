'use strict';
playerApp.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    //var serviceBase = 'http://localhost:8080/AllPlayersTV/';
    var authServiceFactory = {};

    var contentType = 'application/json;charset=UTF-8';

    var _authentication = {
        isAuth: false,
        userName : ""
    };

    var _saveRegistration = function (registration) {

        _logOut();
        var deferred = $q.defer();

        return $http.post('register', registration, { headers: { 'Content-Type': contentType } }).then(function (response) {
            deferred.resolve(response);
        });

    };

    var _getFullJson = function (login) {
        var deferred = $q.defer();
        var data = {
            login: login
        };

        $http.post('api/user/' + login, data, { headers: { 'Content-Type': contentType } }).success(function (response) {
            console.log(response);
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
            _logOut();
        });

        return deferred.promise;
    };

    var _login = function (loginData) {

        if (_authentication.isAuth) {
            _logOut();
        }

        var data = {
            username: loginData.userName,
            password: loginData.password
        };

        var deferred = $q.defer();

        $http.post('api/login', data, { headers: { 'Content-Type': contentType } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        var deferred = $q.defer();

        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.userName = "";

        if (_authentication.isAuth) {
            $http.post('api/logout', "").success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
        }

        return deferred.promise;
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.getFullJson = _getFullJson;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);