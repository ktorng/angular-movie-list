'use strict';

describe('Movie service', function() {
  let factory;

  beforeEach(function() {
    // load module
    module('core.movie');

    // inject factory for testing
    inject(function(Movie) {
      factory = Movie;
    });

    let store = {};

    spyOn(localStorage, 'getItem').and.callFake(function(key) {
      return store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake(function(key, value) {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'clear').and.callFake(function() {
      store = {};
    });
  });

  // check to see expected functions
  it('should have all and add functions', function() {
    expect(angular.isFunction(factory.all)).toBe(true);
    expect(angular.isFunction(factory.add)).toBe(true);
  })

  // check to see if it returns zero movies initially
  it('should return empty list of movies initially', function() {
    expect(factory.all().length).toBe(0);
  })

  // check if it successfully adds a new movie
  it('should return 2 movies after adding 2', function() {
    factory.add({ title: 'dummy movie 1'});
    factory.add({ title: 'dummy movie 2'});

    expect(factory.all().length).toBe(2);
  });

});
