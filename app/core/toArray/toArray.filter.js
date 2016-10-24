// filter to transform object to array for repeater
angular
  .module('core')
  .filter('toArray', function() {
    return function(obj) {
      const result = [];
      angular.forEach(obj, (value) => {
        result.push(value);
      });
      return result;
    }
  })
