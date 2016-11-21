'use strict';

var app = angular.module('TodoApp');

app.controller('MainController', ['$scope', '$mdToast', function ($scope, $mdToast) {
    $scope.$on('notify', function (event, notification) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(notification.message)
            .position('top right')
            .hideDelay(3000)
            .theme(notification.type + '-toast')
        );
    });

}]);