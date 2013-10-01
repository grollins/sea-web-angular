'use strict';

angular.module('angularProject', []);

// Declare app module and Appendages
angular.module('angularProject', ['ngRoute', 'angularProject.services', 'angularProject.directives', 'angularProject.controllers'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
          title: 'Home',
          templateUrl: 'partials/home.html',
          controller: 'homeCtrl'
      })
      .when('/login', {
          title: 'Login',
          templateUrl: 'partials/login.html',
          controller: 'loginCtrl'
      })
      .otherwise({redirectTo: '/home'});
  }])
  .run( function($rootScope, $location, User) {
      // register listener to watch route changes
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if ( User.isLogged == false ) {
              // not a logged user, we should be going to #login
              if ( next.templateUrl == "partials/login.html" ) {
                  // already going to #login, no redirect needed
              } else {
                  // not going to #login, we should redirect now
                  $location.path( "/login" );
              }
          }
      })
  });
