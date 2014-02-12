'use strict';

describe('Filter: search2Querystring', function () {

  // load the filter's module
  beforeEach(module('daFunkApp'));

  // initialize a new instance of the filter before each test
  var search2Querystring;
  beforeEach(inject(function ($filter) {
    search2Querystring = $filter('search2Querystring');
  }));

  it('should return the input prefixed with "search2Querystring filter:"', function () {
    var text = 'angularjs';
    expect(search2Querystring(text)).toBe('search2Querystring filter: ' + text);
  });

});
