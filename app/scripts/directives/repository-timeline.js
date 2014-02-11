'use strict';

angular.module('daFunkApp')
  .directive('repositoryTimeline', function () {
    return {
      templateUrl: 'views/repository-timeline.html',
      restrict: 'E'
    };
  });
