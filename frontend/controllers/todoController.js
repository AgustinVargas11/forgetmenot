'use strict';

var app = angular.module('TodoApp');

app.controller('TodoController', ['$scope', '$mdSidenav', '$rootScope', 'DialogService', 'HttpService', 'NotificationService', function ($scope, $mdSidenav, $rootScope, DialogService, HttpService, NotificationService) {

    $rootScope.$on('refreshTasks', function () {
        getTasks();
    });

    function getTasks(deadline, complete) {
        HttpService.tasks.getAllTasks(deadline, complete)
            .then(function (response) {
                $scope.todos = response;
            });
    }

    function submitNewTask() {
        toggleSideNav();
        HttpService.tasks.submitNewTask($scope.newTodo)
            .then(function (response) {
                newTodoForm.reset();
                NotificationService.notify($scope, {
                    type: 'success',
                    message: 'Task created'
                });
                getTasks();
            });
    }

    function taskDone(id) {
        HttpService.tasks.taskComplete(id)
            .then(function (response) {
                NotificationService.notify($scope, {
                    type: 'success',
                    message: 'Goob Job!'
                });
                getTasks();
            });
    }

    function toggleSideNav() {
        $mdSidenav('right').toggle();
    }

    function showTodo(todo) {
        todo.edit = false;
        DialogService.displayTodo($scope, todo);
    }

    function deleteTask(id) {
        HttpService.tasks.deleteTask(id)
            .then(function (response) {
                NotificationService.notify($scope, {
                    type: 'warn',
                    message: 'Task deleted'
                });
                getTasks();
            });
    }

    function editTask(id, task) {
        console.log(task)
        HttpService.tasks.editTask(id, task)
            .then(function (response) {
                console.log(response)
                NotificationService.notify($scope, {
                    type: success,
                    message: 'Task edited'
                });
                getTasks();
            });
    }

    function openEdit(id, todo) {
        todo.edit = true;
        DialogService.displayTodo($scope, todo);
    }

    getTasks();

    $scope.taskDone = taskDone;

    $scope.submitNewTask = submitNewTask;

    $scope.sideNavToggle = toggleSideNav;

    $scope.minDate = new Date;

    $scope.showTodo = showTodo;

    $scope.editTask = editTask;

    $scope.complete = {
        maxDate: new Date
    };

    $scope.buttons = [{
        title: 'done',
        icon: 'done_all',
        use: taskDone
    }, {
        title: 'delete',
        icon: 'delete_forever',
        use: deleteTask
    }, {
        title: 'edit',
        icon: 'edit',
        use: openEdit
    }];

    $scope.isOpen = false;
    $scope.hover = false;
    $scope.hidden = false;

}]);