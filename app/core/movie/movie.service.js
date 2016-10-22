'use strict';

// core movie service to provide access to movie data in local storage
angular
  .module('core.movie')
  .factory('Movie', function(localStorageService) {
    // movie list
    const movieList = localStorageService.get('movies') ||
      [{
        title: 'dummy title 1',
        year: 2000
      }];

    return {
      // return list of movies
      all: function() {
        return movieList;
      },
      // add new movie to movieList and sync with localStorage
      add: function(formData) {
        movieList.push(formData);
        localStorageService.set('movies', movieList);
      }
    };
  });
