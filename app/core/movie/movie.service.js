'use strict';

// core movie service to provide access to movie data in local storage
angular
  .module('core.movie')
  .factory('Movie', function(localStorageService) {
    // object of movies for constant time lookup
    const movies = localStorageService.get('movies') || {};
    const ratings = localStorageService.get('ratings') || {};
    const orderProp = localStorageService.get('orderProp') || 'Title';

    return {
      // return all movies
      all: function() {
        return movies;
      },
      // return all user input ratings
      ratings: function() {
        return ratings;
      },
      // update order property and persist in localStorage
      getOrderProp: function(prop) {
        return orderProp;
      },
      // update order property and persist in localStorage
      setOrderProp: function(prop) {
        localStorageService.set('orderProp', prop);
      },
      // add new movie to movies and sync with localStorage
      add: function(formData) {
        movies[formData.Title] = formData;
        // if movie was previously rated, update movies
        if (ratings[formData.Title]) {
          movies[formData.Title].myRating = ratings[formData.Title];
        }
        localStorageService.set('movies', movies);
      },
      // remove movie from movies using title as key and sync with localStorage
      remove: function(title) {
        delete movies[title];
        localStorageService.set('movies', movies);
      },
      // add a myRating property to a title and sync with localStorage
      // also keep track of previously rated movies separately
      rate: function(title, rating) {
        if(movies[title]) movies[title].myRating = rating;
        ratings[title] = rating;
        localStorageService.set('movies', movies);
        localStorageService.set('ratings', ratings);
      }
    };
  });
