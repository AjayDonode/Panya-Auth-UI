angular.module('panyaGalaryApp')
	.directive('header', function () {
    return {
        restrict: 'AE', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "views/Header/header.html",
        controller: ['$scope', '$rootScope','$auth', '$filter','$location', function ($scope,$rootScope,$auth,$filter,$location) {
            // Your behaviour goes here :)
       
        $rootScope.$watch("isLoggedIn", function(value) {
        if(value)
            {
                 console.log("isLoggedIn " +value);
                 $scope.isLogin = value;
            }
            refreshHeader();

        });

        var refreshHeader = function (){
        if($rootScope.currentUser==undefined){
           $rootScope.currentUser = {};
           $rootScope.currentUser.name = "Guest";
           $scope.isLogin = false;
         } 
        }

        $scope.logout = function() {
        $auth.logout().then(function() {
                localStorage.removeItem('currentUser');
                $rootScope.isLoggedIn = false;
                $rootScope.currentUser = null;
                $location.path('/#');
            }); 
        };
       
        }]
    }
});