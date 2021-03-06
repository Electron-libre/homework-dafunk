'use strict';

angular.module('daFunkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'nvd3ChartDirectives',
  'perfect_scrollbar',
  'ngProgress'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      })
      .when('/:user/:repository', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });
  });
