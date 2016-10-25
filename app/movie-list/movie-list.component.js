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
        this.ratings = Movie.ratings();
        this.search = {
          list: '',
          new: ''
        };
        this.orderProp = 'title';
        this.showRate = false;

        // search for new movie from omdb api
        this.fetchMovie = () => {
          $http.get(`http://www.omdbapi.com/?t=${this.search.new}&tomatoes=true&plot=full`)
            .then((response) => {
              this.details = response.data;
              return $http.get(`http://www.omdbapi.com/?s=${this.search.new}`)
            })
            .then((response) => {
              if (response.data.Response === 'True') {
                this.details.related = response.data.Search.filter(res => res.Type === 'movie');
              }
            });
        };

        // updates search with new title
        this.update = (imdbId, title) => {
          $http.get(`http://www.omdbapi.com/?i=${imdbId}&tomatoes=true&plot=full`)
            .then((response) => {
              this.details = response.data;
              return $http.get(`http://www.omdbapi.com/?s=${title}`)
            })
            .then((response) => {
              if (response.data.Response === 'True') {
                this.details.related = response.data.Search.filter(res => res.Type === 'movie');
              }
            });
        }

        // add movie to localStorage
        this.addMovie = () => {
          Movie.add(this.details);
        };

        // remove movie from localStorage
        this.removeMovie = () => {
          Movie.remove(this.details.Title);
          this.details = false;
        };

        // view details of movie clicked on in list
        this.viewDetails = (movie) => {
          this.details = movie;
          this.activeTitle = movie.Title;
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
