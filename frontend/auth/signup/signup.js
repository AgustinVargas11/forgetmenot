'use strict';

var app = angular.module('TodoApp');

app.controller('SignupController', ['$scope', '$location', 'UserService', 'HttpService', 'NotificationService', function ($scope, $location, UserService, HttpService, NotificationService) {
    function createNewUser() {
        UserService.signup($scope.newUser)
            .then(function (response) {

                if (response.errorcode) {
                    $scope.error = response.message;
                } else {
                    $location.path('/login');
                    NotificationService.notify($scope, {
                        type: 'success',
                        message: 'registration successful'
                    })

                    // $scope.$emit('notify', )
                }

            }, function (response) {
                console.log('an error has occured', response.data)
            })
    }

    function getUserData() {
        HttpService.checkForDuplicates('username')
            .then(function (response) {
                $scope.usernames = response;
            }).then(function () {
                HttpService.checkForDuplicates('email')
                    .then(function (response) {
                        $scope.emails = response;
                    })
            })
    }

    function checkDuplicateUsernames(form) {
        if ($scope.newUser) {
            if ($scope.newUser.username)
                var username = $scope.newUser.username.toLowerCase();
            else
                return null;
        }
        for (var i = 0; i < $scope.usernames.length; i++) {
            if (username === $scope.usernames[i].username) {

                form.$error.duplicateUsername = true;
                return false;
            }
        }
        delete form.$error.duplicateUsername;
        return true;
    }

    function checkDuplicateEmails(form) {
        if ($scope.newUser) {
            if ($scope.newUser.email) {
                var email = $scope.newUser.email.toLowerCase();
            } else {
                return null;
            }
        }

        for (var i = 0; i < $scope.emails.length; i++) {
            if (email === $scope.emails[i].email) {
                form.$error.duplicateEmail = true;
                return false;
            }
        }
        delete form.$error.duplicateEmail;
        return true;
    }

    getUserData();
    $scope.checkUsernameAvailability = checkDuplicateUsernames;
    $scope.checkEmailAvailability = checkDuplicateEmails;

    $scope.signup = createNewUser;
    var date = new Date();

    $scope.maxDate = new Date(date.setDate(date.getDate() - (8 * 365)));

}]);