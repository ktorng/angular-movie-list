'use strict';

// configure app module
angular
  .module('myMovieList')
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
