'use strict';

angular.module('daFunkApp')
  .filter('search2querystring', function () {
    return function (search) {
      var querystring = "q="+search.q;
      if (search.page) {
        return querystring+"&page="+search.page; 
      }else {
        return querystring;
      }
    };
  });
