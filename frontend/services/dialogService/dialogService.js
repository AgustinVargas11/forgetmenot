'use strict';

var app = angular.module('TodoApp');

app.service('DialogService', ['$mdDialog', 'HttpService', 'NotificationService', function ($mdDialog, HttpService, NotificationService) {

    var self = this;

    function showDialog($event) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $event,
            templateUrl: '../../services/dialogService/dialog.html',
            locals: {
                todo: self.clickedTodo
            },
            controller: DialogController,
            clickOutsideToClose: true
        });

        function DialogController(scope, $mdDialog, todo) {

            function editTask(id, task) {
                HttpService.tasks.editTask(id, task)
                    .then(function (response) {
                        scope.closeDialog();
                        NotificationService.notify($scope, {
                            type: 'success',
                            message: 'Task created'
                        });
                        scope.$emit('refreshTasks');
                    });
            }

            function deleteTask(id) {
                HttpService.tasks.deleteTask(id)
                    .then(function (response) {
                        NotificationService.notify($scope, {
                            type: 'warn',
                            message: 'Task deleted'
                        });
                        scope.$emit('refreshTasks');
                        scope.closeDialog();
                    });
            }

            function taskDone(id) {
                HttpService.tasks.taskComplete(id)
                    .then(function (response) {
                        NotificationService.notify($scope, {
                            type: 'success',
                            message: 'Keep it going!'
                        });
                        scope.closeDialog();
                        scope.$emit('refreshTasks')
                    });
            }

            function getNotes() {
                HttpService.notes.getAllNotes()
                    .then(function (response) {
                        console.log(response)
                        scope.notes = response.data;
                    });
            }

            function openMenu($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            }

            if (todo.deadline)
                todo.deadline = new Date(todo.deadline);

            scope.todo = todo;

            scope.minDate = new Date();

            scope.closeDialog = function () {
                $mdDialog.hide();
            };

            scope.editTask = editTask;

            scope.deleteTask = deleteTask;

            scope.taskDone = taskDone;

            scope.getNotes = getNotes;

            scope.openMenu = openMenu;
        }
    }

    self.displayTodo = function (scope, todo) {
        self.clickedTodo = todo;
        showDialog();
    };
}]);