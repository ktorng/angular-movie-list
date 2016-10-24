'use strict';

// core movie service to provide access to movie data in local storage
angular
  .module('core.movie')
  .factory('Movie', function(localStorageService) {
    // object of movies for constant time lookup
    const movies = localStorageService.get('movies') || {};

    return {
      // return all movies
      all: function() {
        return movies;
      },
      // add new movie to movies and sync with localStorage
      add: function(formData) {
        movies[formData.Title] = formData;
        localStorageService.set('movies', movies);
      },
      // remove movie from movies using title as key and sync with localStorage
      remove: function(title) {
        delete movies[title];
        localStorageService.set('movies', movies);
      },
    };
  });
