// test if object is empty
angular
  .module('core')
  .filter('isEmpty', function() {
    return function(obj) {
      return angular.equals({}, obj);
    };
  });
