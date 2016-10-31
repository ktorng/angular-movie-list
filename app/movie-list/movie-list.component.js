'use strict';

// register `movieList` component, along with its associated template and controller
angular
  .module('movieList')
  .component('movieList', {
    templateUrl: 'movie-list/movie-list.template.html',
    controller: ['Movie', '$mdSidenav',
      function MovieListController(Movie, $mdSidenav) {
        // object of movies for constant time lookup
        this.movies = Movie.all();
        this.ratings = Movie.ratings();
        this.search = {
          list: '',
          new: ''
        };
        this.orderProp = Movie.getOrderProp();
        this.showRate = false;
        this.isSearching = false;

        this.updateOrderProp = () => {
          Movie.setOrderProp(this.orderProp);
        }

        // search for new movie from omdb api
        this.fetchMovie = () => {
          this.isSearching = true;
          this.details = null;
          Movie.omdbSearchByTitle(this.search.new)
            .then((response) => {
              this.details = response.data;
              return Movie.omdbSearchRelated(this.search.new);
            })
            .then((response) => {
              if (response.data.Response === 'True') {
                this.details.related = response.data.Search.filter(res => res.Type === 'movie');
              }
              this.isSearching = false;
            });
        };

        // updates search with new title
        this.updateSearch = (imdbID, title) => {
          this.isSearching = true;
          this.details = null;
          Movie.omdbSearchByImdbID(imdbID)
            .then((response) => {
              this.details = response.data;
              return Movie.omdbSearchRelated(this.search.new);
            })
            .then((response) => {
              if (response.data.Response === 'True') {
                this.details.related = response.data.Search.filter(res => res.Type === 'movie');
              }
              this.isSearching = false;
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
