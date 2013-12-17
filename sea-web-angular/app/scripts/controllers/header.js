'use strict';

angular.module('seaWebApp')
    .controller('HeaderCtrl', function($scope, $http, $location, User) {
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
