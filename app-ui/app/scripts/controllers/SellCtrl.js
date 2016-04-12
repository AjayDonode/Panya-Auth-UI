'use strict';

/**
 * @ngdoc function
 * @name panyaGalaryApp.controller:SellCtrl
 * @description
 * # SellCtrl
 * Controller of the panyaGalaryApp
 */
angular.module('panyaGalaryApp')
    .controller('SellCtrl', function($scope, $auth, $location, $upload, $rootScope, fileReader, SellService) {

        $scope.showModal = false;
        $scope.categories = [];
        $scope.profile = {};



        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        $scope.init = function() {
            $scope.saveSuccess = false;
            $scope.profile.name = $rootScope.currentUser.name + " " + $rootScope.currentUser.lastname;

            $scope.categories = JSON.parse(localStorage.getItem('categories'));
            //console.log("Categories " + categories.length);

        }

        $scope.isPublisher = function() {
            var publisher = ($rootScope.currentUser.role == 0);
            return publisher;
        };

        $scope.uploadCover = function() {
            console.log("ROle in Sell New");
            $scope.showModal = true;
        };

        $scope.linkInstagram = function() {
            $auth.link('instagram')
                .then(function(response) {
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    console.log("currentUser is " + $rootScope.currentUser)
                });
        };

        $scope.createProfile = function() {
            SellService.save($scope.profile)
             .then(function(response) {
                    $scope.saveSuccess = true;
                })
                .catch(function(response) {
                    $scope.errorMessage = {};
                    console.log("Error is "+response.data);
                });

              
        };

        $scope.imageUploads = [];
        $scope.images = [];
        $scope.abort = function(index) {
            $scope.upload[index].abort();
            $scope.upload[index] = null;
        };

        $scope.getFile = function() {
            $scope.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.images.push(result);
                });
        };

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.onFileSelect = function($files) {
            console.log("Total files are " + $files.length);
            $scope.files = $files;
            $scope.upload = [];
            if ($files != null) {

                for (var i = 0; i < $scope.files.length; i++) {
                    var file = $scope.files[i];
                    console.log("File Name is " + file.name);
                    fileReader.readAsDataUrl($scope.file, $scope)
                        .then(function(result) {
                            //$scope.imageData.push(result);
                            file.source = result;
                        });
                }
            }

        };

        $scope.onUploadClicked = function() {
            for (var i = 0; i < $scope.files.length; i++) {
                var file = $scope.files[i];
                file.progress = parseInt(0);
                (function(file, i) {
                    $http.get('/api/s3Policy?mimeType=' + file.type).success(function(response) {
                        var s3Params = response;
                        $scope.upload[i] = $upload.upload({
                            url: 'https://' + $rootScope.config.awsConfig.bucket + '.s3.amazonaws.com/',
                            method: 'POST',
                            transformRequest: function(data, headersGetter) {
                                //Headers change here
                                var headers = headersGetter();
                                delete headers['Authorization'];
                                return data;
                            },
                            data: {
                                'key': 's3UploadExample/' + Math.round(Math.random() * 10000) + '$$' + file.name,
                                'acl': 'public-read',
                                'Content-Type': file.type,
                                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                                'success_action_status': '201',
                                'Policy': s3Params.s3Policy,
                                'Signature': s3Params.s3Signature
                            },
                            file: file,
                        });
                        $scope.upload[i]
                            .then(function(response) {
                                file.progress = parseInt(100);
                                if (response.status === 201) {
                                    var data = xml2json.parser(response.data),
                                        parsedData;
                                    parsedData = {
                                        location: data.postresponse.location,
                                        bucket: data.postresponse.bucket,
                                        key: data.postresponse.key,
                                        etag: data.postresponse.etag
                                    };
                                    $scope.imageUploads.push(parsedData);

                                } else {
                                    alert('Upload Failed');
                                }
                            }, null, function(evt) {
                                file.progress = parseInt(100.0 * evt.loaded / evt.total);
                            });
                    });
                }(file, i));
            }
        }

        $scope.loadImages = function() {

        }

    });
