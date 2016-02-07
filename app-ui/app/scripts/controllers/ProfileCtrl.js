'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:SellCtrl
 * @description
 * # SellCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
  .controller('ProfileCtrl', function ($scope,$auth,$routeParams) {
  
    $scope.username = $routeParams.username;

     $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };


    $scope.linkInstagram = function() {
      $auth.link('instagram')
        .then(function(response){
           $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          console.log("currentUser is "+$rootScope.currentUser)
        });
    };

  });
