'use strict';

angular.module('seaWebApp')
  .factory('SeawebBackend', function ($http) {
      return {
          verifyAssertion: function(assertion) {
              var assertionParam = 'assertion='+assertion;
              return $http({
                  method: 'POST',
                  url: 'http://localhost:8001/login',
                  headers: {
                      'Content-type': 'application/x-www-form-urlencoded',
                  },
                  data: assertionParam
              })
          },
          saveJob: function(jobData) {
              return $http({
                  method: 'POST',
                  url: 'http://localhost:8001/jobs/',
                  headers: {
                      'Content-Type': undefined,
                  },
                  transformRequest: angular.identity,
                  data: jobData
              })
          },
          refreshJobs: function() {
              return $http({
                  method: 'GET',
                  url: 'http://localhost:8001/jobs/'
              })
          }
      }
  });
