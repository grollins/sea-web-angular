'use strict';

angular.module('seaWebApp')
  .controller('LoginCtrl', function ($scope, $log, SeawebBackend, User) {
      $scope.loginFailed = false;
      $scope.status = '';

      $scope.closeAlert = function() {
          $scope.loginFailed = false;
          $scope.status = '';
      };

      $scope.personaLogin = function() {
          navigator.id.get(function(assertion) {
              if (assertion !== null) {
                  SeawebBackend.verifyAssertion(assertion)
                  .success(function(data, status, headers, config) {
                      $log.debug('Successful login');
                      User.login(data.username, data.token);
                  })
                  .error(function(data, status, headers, config) {
                      $log.debug('Failed login');
                      User.logout();
                      $scope.loginFailed = true;
                      $scope.status = status;
                  });
              }
          });
      };
  });
