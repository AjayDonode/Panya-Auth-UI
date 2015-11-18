'use strict';
angular.module('panyaGalaryApp').factory('CategoryService', function($http) {

    var urlBase = 'http://localhost:3000/api';
    var authBase = 'http://localhost:3000/auth'; 
    var CategoryService = {};
 
    

    CategoryService.save =  function(category) {
        return $http.put(urlBase+'/categories', category);
    }; 

    CategoryService.get = function (id ,category) {
        for (var i in users) {
            if (users[i]._id == id) {
                return users[i];
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    CategoryService.delete = function (id) {
         return $http.delete(urlBase+'/categories/'+id , {'_id' : id});
    }

    //Returns the categories
    CategoryService.list = function () {
        return $http.get(urlBase+'/categories');
    }

    return CategoryService;

});