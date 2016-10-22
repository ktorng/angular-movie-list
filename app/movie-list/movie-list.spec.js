'use strict';

describe('movie-list module', function() {

  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('movieList'));

  // Test the controller
  describe('MovieListController', function() {

    it('should create a `movies` model with 2 phones', inject(function($componentController) {
      var ctrl = $componentController('movieList');

      expect(ctrl.movies.length).toBe(2);
    }));

  });
});
