'use strict';

// core movie service to provide access to movie data in local storage and perform $http requests
angular
  .module('core.movie')
  .factory('Movie',
    function(localStorageService, $http) {
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
          movies[formData.imdbID] = formData;
          // if movie was previously rated, update movies
          if (ratings[formData.imdbID]) {
            movies[formData.imdbID].myRating = ratings[formData.imdbID];
          }
          localStorageService.set('movies', movies);
        },
        // remove movie from movies using imdbID as key and sync with localStorage
        remove: function(imdbID) {
          delete movies[imdbID];
          localStorageService.set('movies', movies);
        },
        // add a myRating property to a movie and sync with localStorage
        // also keep track of previously rated movies separately
        rate: function(imdbID, rating) {
          if (movies[imdbID]) movies[imdbID].myRating = rating;
          ratings[imdbID] = rating;
          localStorageService.set('movies', movies);
          localStorageService.set('ratings', ratings);
        },
        omdbSearchByTitle: function(title) {
          return $http.get(`http://www.omdbapi.com/?t=${title}&tomatoes=true&plot=full`);
        },
        omdbSearchRelated: function(title) {
          return $http.get(`http://www.omdbapi.com/?s=${title}`);
        },
        omdbSearchByImdbID: function(imdbID) {
          return $http.get(`http://www.omdbapi.com/?i=${imdbID}&tomatoes=true&plot=full`);
        }
      };
    }
  );
