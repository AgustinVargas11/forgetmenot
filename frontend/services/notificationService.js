'use strict';

var app = angular.module('TodoApp');

app.service('NotificationService', [function () {

    this.notify = function (scope, notification) {
        scope.$emit('notify', notification);
    };
}]);