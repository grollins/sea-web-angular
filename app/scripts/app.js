'use strict';

angular.module('seaWebApp', ['ngRoute'])
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/jobs/:jobId', {
        templateUrl: 'views/job.html',
        controller: 'JobCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .run( function($rootScope, $location, User) {
      // register listener to watch route changes
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if ( User.isLogged == false ) {
              // not a logged user, we should be going to #login
              if ( next.templateUrl == "views/login.html" ) {
                  // already going to #login, no redirect needed
              } else {
                  // not going to #login, we should redirect now
                  $location.path( "/login" );
              }
          }
      })
  });
