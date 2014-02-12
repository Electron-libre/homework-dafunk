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
                        on: $scope.repository_statistics.commits_count 
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
            // TODO: Move in a some logic in service
            

            // Request search results for the current query and page
            $scope.query = function() {
                ngProgress.reset();
                ngProgress.start();
                $location.search($scope.search);

                $http.get('/repositories', {
                    params: $scope.search,
                    cache: true
                }).
                success(function(data, status, headers, config) {
                    $scope.searchResults = data;
                    ngProgress.complete();
                    $scope.setPaginationState();
                });
            }

            $scope.setPaginationState = function() {
                    $scope.nextPage = $scope.getPageNumber('next');
                    $scope.prevPage = $scope.getPageNumber('prev');
                    $scope.currentPage = function() { if ($scope.prevPage) { 
                      return parseInt($scope.prevPage) + 1
                    } else {
                      return 1
                    }}();
                    $scope.totalPages = Math.ceil($scope.searchResults.total_count / 30);
            }

            // Returns page number for the given way ( 'prev' , 'next')
            $scope.getPageNumber = function(way) {
              if ($scope.searchResults && $scope.searchResults.link) {
                var lnk = $scope.searchResults.link.filter(function(e) {
                    return e.rel == way
                })
                if (lnk.length > 0) {
                  return lnk[0].page
                } else {
                  return null
                }
              }
            }

            // Fetch pagination results for the given page
            // on the current search term.
            $scope.getPage = function(page) {
                $scope.search.page = page;
                $scope.query();
            }
            
            // Execute new search:
            //  Removes the page from state
            $scope.newSearch = function() {
              delete $scope.search['page'];
              $scope.query();
            }

            // Set search from url and execute query
            if ($location.search().q) {
                $scope.search = $location.search();
                $scope.query();
            }

            // Repository statistics
            if ($routeParams.user && $routeParams.repository) {
                ngProgress.reset();
                ngProgress.start();
                $http.get('/repositories/' + $routeParams.user + '/' + $routeParams.repository + '/statistics', {
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
