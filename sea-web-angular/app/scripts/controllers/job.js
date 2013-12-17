'use strict';

angular.module('seaWebApp')
    .controller('JobCtrl', function($scope, $http, $location, $routeParams, User) {
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

    });
