'use strict';

angular.module('seaWebApp')
  .controller('LoginCtrl', function ($scope, $http, $location, User) {
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
  });
