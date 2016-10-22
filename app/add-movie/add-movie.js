'use strict';

// register 'addMovie' component
angular
  .module('addMovie', ['ngRoute', 'core.movie'])
  .component('addMovie', {
    templateUrl: 'add-movie/add-movie.template.html',
    controller: ['Movie',
      function AddMovieController(Movie) {
        this.formData = {};
        this.addMovie = function() {
          Movie.add(this.formData);
        };
      }
    ]
  });
