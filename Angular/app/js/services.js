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

service.factory('formDataObject', function() {
    return function(data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
            fd.append(key, value);
        });
        return fd;
    };
});
