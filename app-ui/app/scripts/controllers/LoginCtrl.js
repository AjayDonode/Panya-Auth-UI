'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
    .controller('LoginCtrl', function($scope, $auth, $window, $rootScope, $location) {

        $scope.isAuthenticated = function() {
            $auth.isAuthenticated();
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
            console.log("Calling  " + provider);
            $auth.authenticate(provider)
                .then(function(response) {
                    console.log("Success " + response);
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    $rootScope.currentUser = JSON.stringify(response.data.user);
                    console.log("Success " + response.data);
                    $location.path('/sell');
                })
                .catch(function(response) {
                    console.log("Error " + response.data);
                });
        };

        $scope.emailLogin = function() {
            $auth.login({
                    email: $scope.email,
                    password: $scope.password
                })
                .then(function(response) {
                    var user = JSON.stringify(response.data.user);
                    localStorage.currentUser = user;
                    // sessionStorage.setItem('user',JSON.stringify(response.data.user));
                    // sessionStorage.setItem('token',JSON.stringify(response.satellizer_token));
                    $rootScope.currentUser = response.data.user;
                    $rootScope.isLoggedIn = true;
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
                name: $scope.name,
                lastname: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                age: $scope.age,
                sex: $scope.sex,
                role: 0,
            };

            // Satellizer
            $auth.signup(user)
                .then(function(response) {
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    $rootScope.currentUser.isLogin = true;
                    $location.path('/sell');
                })
                .catch(function(response) {
                    console.log(response.data);
                });
        };

        $scope.logout = function() {
        $auth.logout().then(function() {
                localStorage.removeItem('user');
                $rootScope.isLoggedIn = false;
                $rootScope.currentUser = null;
            }); 
      };

  });
