'use strict';

angular.module('seaWebApp')
    .controller('HomeCtrl', function($scope, $http, User) {
        $scope.jobs = [];
        $scope.username = User.username();

        $scope.job = {
            title: '',
            structureFile: null,
            topologyFile: null,
            iterations: 10,
        };

        $scope.options = {
            iterations: [10, 25, 50, 100, 500],
        };

        $scope.saveJob = function() {
            var fd = new FormData();
            fd.append('title', $scope.job.title);
            fd.append('structure', $scope.job.structureFile);
            fd.append('topology', $scope.job.topologyFile);
            fd.append('iterations', $scope.job.iterations);

            $http.post( 'http://localhost:8001/jobs/', fd, {
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).
            success(function(data, status, headers, config) {
                $scope.status = status;
                console.log('Job post success');
                $scope.refreshJob();
            }).
            error(function(data, status, headers, config) {
                $scope.status = status;
                console.log('Job post failed');
                console.log(data);
                console.log(headers('Content-Type'));
                console.log(config);
            });
            $scope.jobForm.$setPristine();
            $scope.job.title = '';
        };

        $scope.refreshJob = function() {
            $http({method: 'GET', url: 'http://localhost:8001/jobs/'}).
            success(function(data, status) {
                $scope.status = status;
                $scope.jobs = data.results;
                console.log('Job refresh success');
            }).
            error(function(data, status) {
                $scope.jobs = data || 'Job refresh failed';
                $scope.status = status;
                console.log('Job refresh failed');
            });
        };

        $scope.refreshJob();
    });