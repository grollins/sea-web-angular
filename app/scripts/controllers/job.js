'use strict';

angular.module('seaWebApp')
    .controller('JobCtrl', function($scope, $log, $location, $routeParams, SeawebBackend) {
        $scope.jobId = $routeParams.jobId;
        $scope.jobDone = false;

        $scope.refreshJob = function() {
            SeawebBackend.getJobResults($scope.jobId)
            .success(function(data, status) {
                $scope.status = status;
                $scope.jobData = data;
                $scope.result = data.result[0];
                $log.debug('Job refresh success');
                if (data.status === 'done') {
                    $scope.jobDone = true;
                }
            })
            .error(function(data, status) {
                $scope.jobData = data || 'Job refresh failed';
                $scope.status = status;
                $log.debug('Job refresh failed');
            });
        };
        $scope.refreshJob();

        $scope.deleteJob = function() {
            SeawebBackend.deleteJob($scope.jobId)
            .success(function() {
                $log.debug('Job deleted');
                $location.path( '/home' );
            })
            .error(function() {
                $log.debug('Job deletion failed');
            });
        };

        $scope.exportCSV = function() {
            var csvContent = '';
            csvContent += "Total," + $scope.result.total + '\n';
            csvContent += "GB," + $scope.result.gb + '\n';
            csvContent += "Non-Polar," + $scope.result.non_polar + '\n';
            csvContent += "ReactionField," + $scope.result.reaction_field + '\n';
            csvContent += "SolventIntershell," + $scope.result.solvent_intershell + '\n';
            csvContent += "SolventIntrashell," + $scope.result.solvent_intrashell + '\n';
            csvContent += "Solvent-solute," + $scope.result.solvent_solute + '\n';
            csvContent += "SASA," + $scope.result.sasa + '\n';
            csvContent += "Shell0Waters," + $scope.result.shell_zero_waters + '\n';

            var tempLink = document.createElement('a');
            tempLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
            tempLink.setAttribute('download', $scope.jobData.title + '.csv');
            tempLink.click();
        };

    });
