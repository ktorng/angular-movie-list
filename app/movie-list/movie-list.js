'use strict';

// register `movieList` component, along with its associated template and controller
angular
  .module('movieList', ['ngRoute'])
  .component('movieList', {
    templateUrl: 'movie-list/movie-list.template.html',
    controller: [
      function MovieListController() {
        this.movies = [
          {
            title: 'dummy title 1',
            year: 2000
          },
          {
            title: 'dummy title 2',
            year: 2010
          }
        ]
        this.orderProp = 'title';
      }
    ]
  });
