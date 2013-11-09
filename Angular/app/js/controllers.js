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
        $scope.title = '';
        $scope.structureFile = '';
        $scope.topologyFile = '';

        $scope.saveJob = function() {
            console.log($scope.title);
            console.log($scope.structureFile);
            console.log($scope.topologyFile);

            var fd = new FormData();
            fd.append("title", $scope.title);
            fd.append("structure", $scope.structureFile);
            fd.append("topology", $scope.topologyFile);

            $http.post( "http://localhost:8001/jobs/", fd, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).
            success(function(data, status, headers, config) {
                $scope.status = status;
                console.log("Job post success");
                $scope.refreshJob();
            }).
            error(function(data, status, headers, config) {
                $scope.status = status;
                console.log("Job post failed");
                console.log(data);
                console.log(headers('Content-Type'));
                console.log(config);
            });
        };

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

        $scope.refreshJob();
    })

    .controller('jobCtrl', function($scope, $http, $location, $routeParams, User) {
        $scope.jobId = $routeParams.jobId;

        $scope.refreshJob = function() {
            $http({method: 'GET', url: "http://localhost:8001/jobs/" + $scope.jobId + "/"}).
            success(function(data, status, headers, config) {
                $scope.status = status;
                $scope.job_data = data;
                console.log("Job refresh success");
            }).
            error(function(data, status) {
                $scope.job_data = data || "Job refresh failed";
                $scope.status = status;
                console.log("Job refresh failed");
            });
        };

        $scope.refreshJob();

    })

    .controller('headerCtrl', function($scope, $http, $location, User) {
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        $scope.isLoggedIn = function () {
            return User.isLogged;
        };

        $scope.logout = function() {
            User.username = '';
            User.isLogged = false;
            $http.defaults.headers.common['Authorization'] = ''
            $location.path( "/login" );
        };

    });
