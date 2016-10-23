'use strict';

describe('movie-list module', function() {

  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('movieList'));

  // Test the controller
  describe('MovieListController', function() {
    let ctrl;

    beforeEach(inject(function($componentController) {
      ctrl = $componentController('movieList');
    }));

    it('should create a `movies` model with 0 movies initially', function() {
      expect(ctrl.movies.length).toBe(0);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('title');
    });

  });
});
