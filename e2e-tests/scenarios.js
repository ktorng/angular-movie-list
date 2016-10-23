'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('MyMovieList app', function() {

  it('should redirect `index.html` to `index.html#!/movies`', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/movies");
  });


  describe('View: Movie list', function() {

    beforeEach(function() {
      browser.executeScript('return window.localStorage.clear();')
      browser.get('index.html#!/movies');
    });

    it('should filter the movie list as a user types into the search box', function() {
      var movieList = element.all(by.repeater('movie in $ctrl.movies'));
      var query = element(by.model('$ctrl.query'));

    });

  });

});
