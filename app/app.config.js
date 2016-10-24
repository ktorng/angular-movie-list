'use strict';

// configure app module
angular
  .module('myMovieList')
  .config([
    '$mdThemingProvider',
    function($mdThemingProvider) {
      // Dark theme with light foreground
      $mdThemingProvider
        .theme('default')
        .primaryPalette('teal');

      $mdThemingProvider
        .theme('light-on-dark')
        .dark();
    }
  ])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/movies', {
          template: '<movie-list flex layout="column"></movie-list>'
        })
        .when('/add-movie', {
          template: '<add-movie flex layout="column"></add-movie>'
        })
        .otherwise({redirectTo: '/movies'});
    }
  ]);
