'use strict';

var controllersModule = angular.module('angularProject.controllers', []) 

    .controller('loginCtrl', function($scope, $http, $location, User) {
        $scope.username = '';
        $scope.password = '';

        $scope.login = function() {
            var user_data = {
                "username": $scope.username,
                "password": $scope.password,
            };

            $http.post("http://localhost:8001/api-token-auth/", user_data)
            .success(function(response) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                console.log('Successful login');
                User.isLogged = true;
                User.username = $scope.username;
                $location.path( "/home" );
            })
            .error(function(response) {
                console.log('Failed login');
                User.isLogged = false;
                User.username = '';
            });
        }
    })

    .controller('homeCtrl', function($scope, $http, $location, User) {
        $scope.jobs = [];
        $scope.users = [];
        $scope.username = User.username;

        $scope.refreshJob = function() {
            $http({method: 'GET', url: "http://localhost:8001/jobs/"}).
            success(function(data, status) {
                $scope.status = status;
                $scope.jobs = data.results;
                console.log("Job refresh success");
            }).
            error(function(data, status) {
                $scope.jobs = data || "Job refresh failed";
                $scope.status = status;
                console.log("Job refresh failed");
            });
        };

        $scope.saveJob = function() {
            console.log($scope.newJob);
            $http({method: 'POST', url: "http://localhost:8001/jobs/", data: $scope.newJob}).
            success(function(data, status) {
                $scope.status = status;
                console.log("Job post success");
                $scope.refreshJob();
            }).
            error(function(data, status) {
                $scope.status = status;
                console.log("Job post failed");
            });
        };

        $scope.logout = function() {
            User.username = '';
            User.isLogged = false;
            $location.path( "/login" );
        }

        $scope.refreshJob();
    });
