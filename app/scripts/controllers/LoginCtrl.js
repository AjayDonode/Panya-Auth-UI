'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
  .controller('LoginCtrl', function ($scope,$auth) {
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

     $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      	.then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          console.log(response.data);
        })
        .catch(function(response) {
          console.log(response.data);
        });
    };

    $scope.emailLogin = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        })
        .catch(function(response) {
          $scope.errorMessage = {};
          angular.forEach(response.data.message, function(message, field) {
            $scope.loginForm[field].$setValidity('server', false);
            $scope.errorMessage[field] = response.data.message[field];
          });
        });
    };

  });
