'use strict';
angular.module('panyaGalaryApp')
    .factory('SellService', function($http) {
    
    var urlBase = 'http://localhost:3000/api';

    var SellService = {};
    
    SellService.save =  function(profile) {
        return $http.post(urlBase+'/profiles', profile);
    }; 

    SellService.get = function (id ,profile) {
        for (var i in profile) {
            if (profile[i]._id == id) {
                return profile[i];
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    SellService.delete = function (id) {
         return $http.delete(urlBase+'/profiles/'+id , {'id' : id});
    }

    //Returns the categories
    SellService.list = function () {
        return $http.get(urlBase+'/profiles');
    }

    return SellService;

});