'use strict';

// register `movieList` component, along with its associated template and controller
angular
  .module('movieList')
  .component('movieList', {
    templateUrl: 'movie-list/movie-list.template.html',
    controller: ['Movie',
      function MovieListController(Movie) {
        this.movies = Movie.all();
        this.orderProp = 'title';
      }
    ]
  });
