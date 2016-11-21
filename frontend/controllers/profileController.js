'use strict';

var app = angular.module('TodoApp');

app.controller('ProfileController', ['$scope', 'HttpService', function ($scope, HttpService) {

    HttpService.getUser()
        .then(function (response) {
            $scope.user = response;
            $scope.user.rank = $scope.ranks[Math.floor(($scope.user.notes + $scope.user.completedTasks) / 100)];
        })

    $scope.ranks = ['Lazy Bum', 'Less Lazy Bum', 'Procrastinator', 'Almost Efficient', 'Most Efficient', 'Time Management Guru', 'Master of Efficieny and Time Management'];



}]);