'use strict';

// register `movieList` component, along with its associated template and controller
angular
  .module('movieList')
  .component('movieList', {
    templateUrl: 'movie-list/movie-list.template.html',
    controller: ['Movie', '$http', '$mdSidenav',
      function MovieListController(Movie, $http, $mdSidenav) {
        // object of movies for constant time lookup
        this.movies = Movie.all();
        this.ratings = Movie.ratings();
        this.search = {
          list: '',
          new: ''
        };
        this.orderProp = Movie.getOrderProp();
        this.showRate = false;

        this.updateOrderProp = () => {
          Movie.setOrderProp(this.orderProp);
        }

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
        this.updateSearch = (imdbId, title) => {
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
          Movie.remove(this.details.imdbID);
          this.details = false;
        };

        // view details of movie clicked on in list
        this.viewDetails = (movie) => {
          this.details = movie;
          this.activeImdbId = movie.imdbID;
          this.showRate = false;
          $mdSidenav('left').close();
        };

        // toggle rating input
        this.toggleRate = () => {
          this.showRate = !this.showRate;
        };

        // rate currently viewed movie
        this.submitRating = () => {
          Movie.rate(this.details.imdbID, this.rating);
          this.showRate = false;
          this.rating = '';
        };

        // toggle left sidenav
        this.toggleLeft = () => {
          $mdSidenav('left').toggle();
        };
      }
    ]
  });
