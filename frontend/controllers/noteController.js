'use strict';

var app = angular.module('TodoApp');

app.controller('NoteController', ['$scope', 'HttpService', 'NotificationService', function ($scope, HttpService, NotificationService) {

    function getNotes() {
        HttpService.notes.getAllNotes()
            .then(function (response) {
                $scope.notes = response;
            })
    }

    function submitNewNote() {
        HttpService.notes.submitNewNote($scope.newNote)
            .then(function (response) {
                newNoteForm.reset();
                NotificationService.notify($scope, {
                    type: 'success',
                    message: 'Note recorded'
                });
                getNotes();
            });
    }

    $scope.submitNewNote = submitNewNote;
    getNotes();
}]);