'use strict';

angular.module('daFunkApp')
  .controller('MainCtrl', ['$scope','$http','$location', function ($scope, $http, $location) {
    
$scope.query = function() {
      //TODO: Put relatives URI on resouces in backend to use them to build links
      $location.search({search: $scope.search});
      $http.get('http://localhost:9000/repositories',{params:{q:$scope.search}, cache:true}).
      success(function(data, status, headers, config) {
        $scope.searchResults= data;
      })
    }
    
    if ($location.search().search != undefined){
      $scope.search = $location.search().search;
      $scope.query();
    }
            
  }]);
