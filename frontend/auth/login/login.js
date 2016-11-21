'use strict';

var app = angular.module('TodoApp');

app.controller('LoginController', ['$scope', '$location', '$mdToast', 'UserService', function ($scope, $location, $mdToast, UserService) {
    function login(form) {
        UserService.login($scope.user)
            .then(function (response) {
                if (response.data.success === true)
                    $location.path('/todos');
                else
                    $scope.error = response.data.message;
            });
    }
    $scope.login = login;



}]);