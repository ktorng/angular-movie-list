'use strict';

// declare app level module which depends on views, and components
angular
  .module('myMovieList', [
    'ngRoute',
    'core',
    'LocalStorageModule',
    'movieList',
    'addMovie'
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
        .when('/add-movie', {
          template: '<add-movie></add-movie>'
        })
        .otherwise({redirectTo: '/movies'});
    }
  ]);
