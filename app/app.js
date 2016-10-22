'use strict';

// declare app level module which depends on views, and components
angular
  .module('myMovieList', [
    'ngRoute',
    'movieList'
  ])
  .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/movies', {
          template: '<movie-list></movie-list>'
        })
        .otherwise({redirectTo: '/movies'});
    }
  ]);
