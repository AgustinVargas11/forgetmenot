'use strict';

var app = angular.module('TodoApp');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../../templates/landing.html',
            controller: 'MainController'
        })
        .when('/todos', {
            templateUrl: '../../templates/todos.html',
            controller: 'TodoController'
        })
        .when('/notes', {
            templateUrl: '../../templates/notes.html',
            controller: 'NoteController'
        })
        .when('/profile', {
            templateUrl: '../../templates/profile.html',
            controller: 'ProfileController'
        })
        .otherwise('/')
}]);