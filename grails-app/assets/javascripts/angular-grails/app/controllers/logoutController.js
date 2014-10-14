playerApp.controller('LogoutCtrl', ['authService',
    function (authService) {
        authService.logOut();
    }]);