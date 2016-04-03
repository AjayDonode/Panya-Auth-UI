
/**
 * @ngdoc overview
 * @name panyaGalaryApp
 * @description
 * # panyaGalaryApp
 *
 * Main module of the application.
 */
angular
  .module('panyaGalaryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages',
    'satellizer',
    'angularFileUpload'
  ])
  .value('userObject', '')

  .config(function ($routeProvider,$authProvider) {

    // $stateProvider.state('header',{
    //   templateUrl: '',
    //   controller: '
    // })
    //route provider 
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
       .when('/sell', {
        templateUrl: 'views/sell.html',
        controller: 'SellCtrl',
        controllerAs: 'sellcontroller',
        resolve: {
          loginRequired: loginRequired
        }
      })
        .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginctrl'
      })
        .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginctrl'
      }).when('/:username', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profilectrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .otherwise({
        redirectTo: '/'
      });


  
     <!-- Auth Provider -->  
    $authProvider.loginUrl = 'http://localhost:3000/auth/login';
    $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
    $authProvider.oauth2({
      name: 'instagram',
      url: 'http://localhost:3000/auth/instagram',
      redirectUri: 'http://localhost:9000',
      clientId: '421b66a865f1434c92566ba006492331',
      requiredUrlParams: ['scope'],
      scope: ['likes'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    }); //Client Secret : 03ff12bd27a74a7c9aa8914b0dc3fe3e

      //Oauth 2 configuration 
    $authProvider.google({
      url: 'http://localhost:3000/auth/google',
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      clientId: '119243385812-0furu31bg1rbhjgl5jaqb3at8bkf28bk.apps.googleusercontent.com',
      scopeDelimiter: ' ',
      display: 'popup',
      type: '2.0',
      popupOptions: { width: 452, height: 633 }
    });
      //gsKMNjrx78bPOkDjJC-9_CjB : Client Secret for google
    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  

  });
