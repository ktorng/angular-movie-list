'use strict';

// configure $route service
angular
  .module('myMovieList')
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/movies', {
          template: '<movie-list></movie-list>'
        })
        .when('/add-movie', {
          template: '<add-movie></add-movie>'
        })
        .otherwise({redirectTo: '/movies'});
    }
  ]);
