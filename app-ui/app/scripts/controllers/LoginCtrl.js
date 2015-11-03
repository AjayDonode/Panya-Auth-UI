'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
  .controller('LoginCtrl', function ($scope,$auth,$window,$rootScope,$location,userObject) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // this.userObject.isLogin = true;
     $scope.isAuthenticated = function() {
      
    };

    $scope.linkInstagram = function() {
      // connect email account with instagram
    };


      $scope.instagramLogin = function() {
        $auth.authenticate('instagram')
          .then(function(response) {
            $window.localStorage.currentUser = JSON.stringify(response.data.user);
            $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          })
          .catch(function(response) {
            console.log(response.data);
          });
      };

     $scope.authenticate = function(provider) {
      console.log("Calling  "+provider);
      $auth.authenticate(provider)
      	.then(function(response) {
          console.log("Success "+response);
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          console.log("Success "+response.data);
          $location.path('/sell');
        })
        .catch(function(response) {
          console.log("Error "+response.data);
        });
    };

    $scope.emailLogin = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          console.log("Current user is "+$rootScope.currentUser.email);
          $location.path('/sell');
        })
        .catch(function(response) {
          $scope.errorMessage = {};
          angular.forEach(response.data.message, function(message, field) {
            $scope.loginForm[field].$setValidity('server', false);
            $scope.errorMessage[field] = response.data.message[field];
          });
        });
    };

    //Signup Refactor to move in Signup controller
      $scope.signup = function() {
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      // Satellizer
      $auth.signup(user)
        .catch(function(response) {
          console.log(response.data);
        });
    };

  });
