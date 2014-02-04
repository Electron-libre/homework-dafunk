'use strict';

angular.module('daFunkApp')
  .directive('repositorySelect', function () {
    return {
      templateUrl: 'views/repository-select.html',
      restrict: 'E',
      controller: function ($scope) {
        return {

        }
      }
    };
  });
