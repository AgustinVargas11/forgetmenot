'use strict';

var app = angular.module('TodoApp');

app.directive('navbar', ['UserService', function (UserService) {
    return {
        templateUrl: '../../directives/navbar/navbar.html',
        link: function (scope) {
            scope.userService = UserService;
        }
    }
}]);