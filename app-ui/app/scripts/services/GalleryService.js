'use strict';
angular.module('panyaGalaryApp')
    .factory('GalleryService', function($http) {
    
    var urlBase = 'http://localhost:3000/api';

    var GalleryService = {};
    
    GalleryService.save =  function(rapidtest) {
        return $http.post(urlBase+'/rapidtest', rapidtest);
    }; 

    GalleryService.get = function (id ,rapidtest) {
        for (var i in rapidtest) {
            if (rapidtest[i]._id == id) {
                return rapidtest[i];
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    GalleryService.delete = function (id) {
         return $http.delete(urlBase+'/rapidtest/'+id , {'id' : id});
    }

    //Returns the categories
    GalleryService.list = function () {
        return $http.get(urlBase+'/rapidtest');
    }

    return GalleryService;

    //Gallerty Title
    //Gallery Discription
    //Tags 

});