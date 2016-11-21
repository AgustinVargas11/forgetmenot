'use strict';

var app = angular.module('TodoApp.Auth', []);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/signup', {
            templateUrl: '../auth/signup/signup.html',
            controller: 'SignupController'
        })
        .when('/login', {
            templateUrl: '../auth/login/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            template: '',
            controller: 'LogoutController'
        })
}]);

app.service('TokenService', [function () {
    var userToken = "token";

    this.setToken = function (token) {
        localStorage[userToken] = token;
    };

    this.getToken = function () {
        return localStorage[userToken];
    };

    this.removeToken = function () {
        localStorage.removeItem(userToken);
    };
}]);


app.service('UserService', ['$http', '$location', 'TokenService', function ($http, $location, TokenService) {

    this.signup = function (user) {
        return $http.post('/auth/signup', user);
    };

    this.login = function (user) {
        return $http.post('/auth/login', user)
            .then(function (response) {
                if (response.data.success === true) {
                    TokenService.setToken(response.data.token);
                }
                return response;
            });
    };

    this.logout = function () {
        TokenService.removeToken();
        $location.path('/');
    };

    this.isAuthenticated = function () {
        return !!TokenService.getToken();
    };

}]);

app.factory('AuthInterceptor', ['$q', '$location', 'TokenService', function ($q, $location, TokenService) {
    return {
        request: function (config) {

            var token = TokenService.getToken();

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                TokenService.removeToken();
                $location.path('/login');
                return response;
            }
            return $q.reject(response.message);
        }
    }
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);

app.controller('AuthController', ['$scope', 'AuthInterceptor', function ($scope, AuthInterceptor) {

}]);