'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
  .controller('MainCtrl', function ($scope,$auth,CategoryService) {



    $scope.category = {};
    $scope.categories = [];
    
    $scope.init = function(){
    	console.log("Loading categories");
    	loadCategories();
    }
    $scope.addCategory = function() {
    	$scope.category.description = "Added through UI";
  		console.log("called add category "+$scope.category.name);
     	CategoryService.save($scope.category)
            .success(function(data) {
                if(data.success){
                    console.log("Saved Succesfully");
                    loadCategories();
                }
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
        });

    };

    $scope.removeCategory = function(category) {
        
        console.log("Deleting category "+category);
        CategoryService.delete(category._id)
            .success(function(data) {
                if(data.success){
                    console.log("Deleted Succesfully");
                    loadCategories();
                }
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
        });

    };


    function loadCategories(){
    	CategoryService.list()
            .success(function(data) {
                console.log("Loaded "+data);
                $scope.categories = data;

                localStorage.setItem('categories', JSON.stringify($scope.categories));
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
        });
    }



  });
