'use strict';

angular.module('daFunkApp')
    .controller('MainCtrl', ['$scope', '$http', '$location', '$routeParams', 'ngProgress',
        function($scope, $http, $location, $routeParams, ngProgress) {


            // NVD3 Tooltip listner to catch data
            // 
            $scope.$on('tooltipShow.directive', function(angularEvent, event) {
                if (event.label) {
                    $scope.tooltipData = {
                        user: event.label,
                        commits_count: event.value,
                        on: '100'
                    }
                } else {
                    $scope.tooltipData = {
                        user: event.series.key,
                        commits_count: event.value,
                        on: event.point[0]
                    }
                }
                angularEvent.targetScope.$parent.$digest();
            });

            // NVD3 Tooltip listner to reset data
            $scope.$on('tooltipHide.directive', function(angularEvent, event) {
                $scope.tooltipData = {
                    user: ''
                };
            });

            // NVD3 data lenses configuration functions 
            //

            $scope.committerLogin = function() {
                return function(data) {
                    return data.committer.login;
                };
            }

            $scope.commits = function() {
                return function(data) {
                    return data.commits.count;
                };
            }

            $scope.commitDay = function() {
                return function(data) {
                    return data[0];
                };
            }

            $scope.commitCount = function() {
                return function(data) {
                    return data[1];
                };
            }

            $scope.yearMonth = function() {
                return function(data) {
                    return d3.time.format('%y-%b')(new Date(data));
                };
            }
            // Search functions
            $scope.query = function() {
                ngProgress.reset();
                ngProgress.start();
                $location.search({
                    search: $scope.search
                });

                $http.get('http://localhost:9000/repositories', {
                    params: {
                        q: $scope.search
                    },
                    cache: true
                }).
                success(function(data, status, headers, config) {
                    $scope.searchResults = data;
                    ngProgress.complete();
                });
            }

            // Set search from url and execute query
            if ($location.search().search != undefined) {
                $scope.search = $location.search().search;
                $scope.query();
            }

            // Repository statistics
            if ($routeParams.user && $routeParams.repository) {
                ngProgress.reset();
                ngProgress.start();
                $http.get('http://localhost:9000/repositories/' + $routeParams.user + '/' + $routeParams.repository + '/statistics', {
                    cache: true
                }).
                success(function(data, status, headers, config) {

                    $scope.repository_statistics = data;

                    $scope.commitsByDay = data.committers.map(function(committer) {
                        return {
                            key: committer.committer.login,
                            values: committer.commits.dates
                        }
                    });
                    ngProgress.complete();
                })
            }

        }
    ]);
