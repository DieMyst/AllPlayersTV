'use strict';
playerApp.controller('SignupCtrl', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () {

        authService.saveRegistration($scope.registration).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                startTimer($scope.registration);

            },
            function (response) {
                $scope.message = "Failed to register user due to: " + response.data;
            });
    };

    var startTimer = function (data) {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            authService.login($scope.registration).then(function (response) {
                    $location.path("/user/" + data.userName)
                },
                function (err) {
                    $scope.message = "Ошибка авторизации. Неправильно указан логин или пароль.";
                });
        }, 2000);
    }

}]);