'use strict';

// declare app level module and inject dependencies
angular
  .module('myMovieList', [
    'ngRoute',
    'ngMaterial',
    'core',
    'LocalStorageModule',
    'movieList',
    'addMovie'
  ])
