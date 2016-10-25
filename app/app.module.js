'use strict';

// declare app level module and inject dependencies
angular
  .module('myMovieList', [
    'ngRoute',
    'ngMaterial',
    'ngMdIcons',
    'core',
    'utils.autofocus',
    'LocalStorageModule',
    'movieList'
  ])
