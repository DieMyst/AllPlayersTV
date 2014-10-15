playerApp.controller('LoginCtrl', ['$scope', '$routeParams', '$http', '$location', 'authService',
    function ($scope, $routeParams, $http, $location, authService) {

        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.login = function () {

            authService.login($scope.loginData).then(function (response) {
                    $location.path("/user/" + $scope.loginData.userName)
                },
                function (err) {
                    $scope.message = err.error_description;
                });
        };

        $scope.goToReg = function () {
            $location.path("register");
        };
    }]);
