'use strict';

angular.module('daFunkApp')
  .directive('repositoryList', function () {
    return {
      templateUrl: 'views/repository-list.html',
      restrict: 'E',
  }});
