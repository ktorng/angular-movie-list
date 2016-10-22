'use strict';

// declare app level module and inject dependencies
angular
  .module('myMovieList', [
    'ngRoute',
    'core',
    'LocalStorageModule',
    'movieList',
    'addMovie'
  ])
