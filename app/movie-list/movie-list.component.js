'use strict';

// register `movieList` component, along with its associated template and controller
angular
  .module('movieList')
  .component('movieList', {
    templateUrl: 'movie-list/movie-list.template.html',
    controller: ['Movie', '$http',
      function MovieListController(Movie, $http) {
        // object of movies for constant time lookup
        this.movies = Movie.all();
        this.search = {
          list: '',
          new: ''
        };
        this.orderProp = 'title';
        this.showRate = false;

        // search for new movie from omdb api
        this.fetchMovie = (title) => {
          $http.get(`http://www.omdbapi.com/?t=${this.search.new}&tomatoes=true&plot=full`)
            .then((response) => {
              this.details = response.data;
              console.log(this.details);
            });
        };

        // add movie to localStorage
        this.addMovie = () => {
          Movie.add(this.details);
        };

        // remove movie from localStorage
        this.removeMovie = () => {
          Movie.remove(this.details.Title);
        };

        // view details of movie clicked on in list
        this.viewDetails = (movie) => {
          this.details = movie;
          this.showRate = false;
        };

        // toggle rating input
        this.toggleRate = () => {
          this.showRate = !this.showRate;
        };

        // rate currently viewed movie
        this.submitRating = () => {
          Movie.rate(this.details.Title, this.rating);
          this.showRate = false;
          this.rating = '';
        }
      }
    ]
  });
