'use strict';

angular.module('daFunkApp')
  .directive('committers', function () {
    return {
      templateUrl: 'views/committers.html',
      restrict: 'E'
    };
  });
