'use strict';
playerApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/register', {
                templateUrl: 'register.html',
                controller: 'SignupCtrl'
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
                redirectTo: '/login'
            });
        $httpProvider.interceptors.push('authInterceptorService');
    }]);