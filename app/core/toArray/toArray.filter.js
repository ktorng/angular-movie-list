// filter to transform movie object to array for repeater
angular
  .module('core')
  .filter('toArray', function() {
    return function(obj) {
      const result = [];
      angular.forEach(obj, (movie) => {
        movie.myRating = movie.myRating > -1 ? movie.myRating : -1;
        result.push(movie);
      });
      return result;
    }
  })
