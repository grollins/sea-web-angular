'use strict';

angular.module('seaWebApp')
  .factory('User', function () {
      var sdo = {
          isLogged: false,
          username: ''
        };
      return sdo;
    });
