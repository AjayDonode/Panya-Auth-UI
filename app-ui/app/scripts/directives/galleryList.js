angular.module("panyaGalaryApp")
    .directive("galleryList", function() {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/gallery-list.html',
            link: function(scope, elm, attrs) {}
        };
    });
