'use strict';

/* Services */
var service = angular.module('angularProject.services', []);

service.factory('User', [function() {
    var sdo = {
        isLogged: false,
        username: ''
    };
    return sdo;
}]);
