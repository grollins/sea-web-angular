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
      };

      $scope.personaLogin = function() {
          navigator.id.get(function(assertion) {
              var assParam = "assertion="+assertion;
              $http({
                  method: 'POST',
                  url: 'http://127.0.0.1:8001/login',
                  headers: {
                      'Content-type': 'application/x-www-form-urlencoded',
                  },
                  data: assParam
              })
              .success(function(data, status, headers, config) {
                  console.log('Successful login');
                  User.isLogged = true;
                  User.username = data.username;
                  $http.defaults.headers.common['Authorization'] = 'Token ' + data.token;
                  $location.path( "/home" );
              })
              .error(function(data, status, headers, config) {
                  console.log('Failed login');
                  console.log(data);
                  console.log(config);
                  User.isLogged = false;
                  User.username = '';
              });
          });
      };
  });
