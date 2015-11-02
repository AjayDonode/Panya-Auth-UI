'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:SellCtrl
 * @description
 * # SellCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
  .controller('SellCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     $scope.isAuthenticated = function() {
      // check if logged in
    };

    $scope.linkInstagram = function() {
      // connect email account with instagram
    };
  });
