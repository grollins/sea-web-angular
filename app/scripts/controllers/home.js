'use strict';

angular.module('seaWebApp')
    .controller('HomeCtrl', function($scope, $log, SeawebBackend, User) {
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

            SeawebBackend.saveJob(fd)
            .success(function(data, status, headers, config) {
                $scope.status = status;
                $log.debug('Job post success');
                $scope.refreshJob();
            })
            .error(function(data, status, headers, config) {
                $scope.status = status;
                $log.debug('Job post failed');
                $scope.refreshJob();
            });
            $scope.jobForm.$setPristine();
            $scope.job.title = '';
        };

        $scope.refreshJob = function() {
            SeawebBackend.refreshJob()
            .success(function(data, status) {
                $scope.status = status;
                $scope.jobs = data.results;
                $log.debug('Job refresh success');
            })
            .error(function(data, status) {
                $scope.jobs = data || 'Job refresh failed';
                $scope.status = status;
                $log.debug('Job refresh failed');
            });
        };

        $scope.refreshJob();
    });