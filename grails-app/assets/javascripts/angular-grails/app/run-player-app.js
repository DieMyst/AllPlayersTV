'use strict';
playerApp.run(['authService', function (authService) {
    authService.fillAuthData();
}]);