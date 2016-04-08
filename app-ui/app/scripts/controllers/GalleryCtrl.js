'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:SellCtrl
 * @description
 * # SellCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
    .controller('GalleryCtrl', function($scope, $auth, $routeParams, GalleryService) {

        $scope.username = $routeParams.username;

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };


        //initUserObject();
        loadtestData();
        //loadUsers();




        function loadtestData() {
            $scope.testDataList = RapidTestService.list().success(function(data) {
                $scope.testDataList = data;
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.submit = function() {
            RapidTestService.save($scope.testData).success(function(data) {

                $('#rapidTestModal').modal('hide');
                $scope.reset();
                loadtestData();
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        };

        $scope.edit = function(id) {
            //rapidTestModal
            toggleModal();
            for (var i = 0; i < $scope.testDataList.length; i++) {
                if ($scope.testDataList[i]._id === id) {
                    $scope.testData = angular.copy($scope.testDataList[i]);
                    break;
                }
            }
        }

        $scope.editDetail = function(id) {
            //rapidTestModal
            //toggleModal();
            for (var i = 0; i < $scope.testDataList.length; i++) {
                if ($scope.testDataList[i]._id === id) {
                    $scope.testData = angular.copy($scope.testDataList[i]);
                    break;
                }
            }
            SessionData.setTestData($scope.testData);
            $location.path("testdetails");
        }



        $scope.add = function() {
            toggleModal();
            this.reset();
        }

        $scope.remove = function(id) {
            RapidTestService.delete(id).success(function(data) {
                console.log("Deleted " + data);
                loadtestDatas();
                $scope.reset();
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }

        $scope.reset = function() {
            initUserObject();
            $scope.myForm.$setPristine(); //reset Form
        };

        function initUserObject() {
            $scope.testData = {
                id: null,
                name: '',
                owner: '',
                approver: '',
                brand: '',
                market: '',
                division: '',
                department: '',
                class: '',
                type: '',
                details: '',
                output: '',
                secoutput: '',
                objective: '',
                stylecount: '',
                cc_count: '',
                retailvalue: '',
                bizimpact: '',
                testweeks: '',
                offerflowmonth: '',
                startdate: '',
                resultdate: '',
                status: 'New',
                created_by: $scope.currentUser
            };


        };

        var toggleModal = function() {
            $scope.showModal = !$scope.showModal;
        };


});
