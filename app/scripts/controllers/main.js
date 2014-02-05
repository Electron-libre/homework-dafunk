'use strict';

angular.module('daFunkApp')
    .controller('MainCtrl', ['$scope', '$http', '$location', '$routeParams',
        function($scope, $http, $location, $routeParams) {

            $scope.query = function() {

                $scope.committerLogin = function() {
                  return function(data) {
                    return data.committer.login;
                  };
                }

                $scope.commits = function() {
                  return function(data) {
                    return data.commits;
                  };
                }

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
                })
            }

            if ($location.search().search != undefined) {
                $scope.search = $location.search().search;
                $scope.query();
            }

            if ($routeParams.user && $routeParams.repository) {
                $http.get('http://localhost:9000/repositories/' + $routeParams.user + '/' + $routeParams.repository + '/statistics').
                success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.repository_statistics = data;
                })
            }
        }
    ]);
