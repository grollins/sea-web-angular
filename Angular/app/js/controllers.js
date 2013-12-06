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

        $scope.job = {
            title: "",
            structureFile: null,
            topologyFile: null,
            iterations: 10,
        };

        $scope.options = {
            iterations: [10, 25, 50, 100, 500],
        };

        $scope.saveJob = function() {
            console.log($scope.job.title);
            console.log($scope.job.iterations);
            // console.log($scope.job.structureFile);
            // console.log($scope.job.topologyFile);

            var fd = new FormData();
            fd.append("title", $scope.job.title);
            fd.append("structure", $scope.job.structureFile);
            fd.append("topology", $scope.job.topologyFile);

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
            $scope.jobForm.$setPristine();
            $scope.job.title = '';
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
        $scope.jobDone = false;

        $scope.refreshJob = function() {
            $http({method: 'GET', url: "http://localhost:8001/jobs/" + $scope.jobId + "/"}).
            success(function(data, status, headers, config) {
                $scope.status = status;
                $scope.job_data = data;
                $scope.result = data.result[0];
                console.log("Job refresh success");
                if (data.status === 'Done') {
                    $scope.jobDone = true;
                }
            }).
            error(function(data, status) {
                $scope.job_data = data || "Job refresh failed";
                $scope.status = status;
                console.log("Job refresh failed");
            });
        };

        $scope.refreshJob();

    })

    .controller('aboutCtrl', function($scope) {
    })

    .controller('contactCtrl', function($scope) {
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
