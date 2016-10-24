'use strict';

// register `movieList` component, along with its associated template and controller
angular
  .module('movieList')
  .component('movieList', {
    templateUrl: 'movie-list/movie-list.template.html',
    controller: ['Movie', '$http',
      function MovieListController(Movie, $http) {
        this.movies = Movie.all();
        this.search = {
          list: '',
          new: ''
        };
        this.orderProp = 'title';

        this.fetchMovie = (title) => {
          $http.get(`http://www.omdbapi.com/?t=${this.search.new}&tomatoes=true&plot=full`)
            .then((response) => {
              this.details = response.data;
              console.log(this.details);
            });
        };
      }
    ]
  });
