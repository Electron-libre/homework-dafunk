'use strict';

angular.module('daFunkApp')
  .directive('repositoryTimeline', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the repositoryTimeline directive');
      }
    };
  });
