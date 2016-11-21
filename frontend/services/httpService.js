'use strict';

var app = angular.module('TodoApp');

app.service('HttpService', ['$http', function ($http) {

    this.getUser = function () {
        return $http.get('/api/user')
            .then(function (response) {
                return response.data;
            })
    };

    this.checkForDuplicates = function (field) {
        return $http.get('/data?field=' + field)
            .then(function (response) {
                return response.data;
            })
    };

    this.tasks = {
        getAllTasks: function (deadline, complete) {
            var url = 'api/todos/?';
            if (deadline)
                url += 'deadline=' + deadline + 'T04:00:00.000Z&';
            if (complete)
                url += 'complete=' + complete;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        },

        getOneTask: function (id) {
            return $http.get('/api/todos/' + id)
                .then(function (response) {
                    return response.data;
                });
        },

        submitNewTask: function (newTodo) {
            return $http.post('/api/todos', newTodo)
                .then(function (response) {
                    return response.data;
                });
        },

        editTask: function (id, task) {
            return $http.put('/api/todos/' + id, task)
                .then(function (response) {
                    return response.data
                });
        },

        taskComplete: function (id) {
            return $http.put('/api/todos/' + id)
                .then(function (response) {
                    console.log(response.data)
                    return response.data;
                });
        },

        deleteTask: function (id) {
            return $http.delete('/api/todos/' + id)
                .then(function (response) {
                    return response.data;
                })
        }
    };


    this.notes = {
        getAllNotes: function () {
            return $http.get('/api/notes/')
                .then(function (response) {
                    return response.data;
                });
        },
        submitNewNote: function (note) {
            return $http.post('/api/notes/', note)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                })
        }
    };
}]);