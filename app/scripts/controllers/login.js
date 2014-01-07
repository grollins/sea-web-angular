'use strict';

angular.module('seaWebApp')
  .controller('LoginCtrl', function ($scope, $http, User) {
      $scope.personaLogin = function() {
          navigator.id.get(function(assertion) {
              var assertionParam = 'assertion='+assertion;
              $http({
                  method: 'POST',
                  url: 'http://127.0.0.1:8001/login',
                  headers: {
                      'Content-type': 'application/x-www-form-urlencoded',
                  },
                  data: assertionParam
              })
              .success(function(data, status, headers, config) {
                  console.log('Successful login');
                  User.login(data.username, data.token);
              })
              .error(function(data, status, headers, config) {
                  console.log('Failed login');
                  console.log(data);
                  console.log(config);
                  User.logout();
              });
          });
      };
  });
