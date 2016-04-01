angular.module('panyaGalaryApp')
  .directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        for (var i = 0; i < e.target.files.length; i++) {
        $scope.file = (e.srcElement || e.target).files[i];
        $scope.getFile();
      }
      }) 
    } 
  }  
});