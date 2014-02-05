'use strict';

describe('Directive: repositoryTimeline', function () {

  // load the directive's module
  beforeEach(module('daFunkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<repository-timeline></repository-timeline>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the repositoryTimeline directive');
  }));
});
