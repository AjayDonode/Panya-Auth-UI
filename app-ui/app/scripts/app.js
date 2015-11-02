'use strict';

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
    'satellizer'
  ])
  .value('userObject', '')

  .config(function ($routeProvider,$authProvider) {
    
    $authProvider.loginUrl = 'http://localhost:3000/auth/login';
    $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
    
    $authProvider.oauth2({
      name: 'instagram',
      url: 'http://localhost:3000/auth/instagram',
      redirectUri: 'http://localhost:8000',
      clientId: '799d1f8ea0e44ac8b70e7f18fcacedd1',
      requiredUrlParams: ['scope'],
      scope: ['likes'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });

    // $routeProvider
    // .state('app', {
    //   url: '',
    //   views: {
    //     'header': {
    //           templateUrl: 'views/Header/header.html',
    //           controller: 'HeaderCtrl'
    //     }
    //   }
    // });
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
        controllerAs: 'sellcontroller'
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
      })

      .otherwise({
        redirectTo: '/'
      });
      
      //Oauth 2 configuration 
    $authProvider.google({
      url: '/auth/google',
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
  
    // Generic OAuth 2.0
    $authProvider.oauth2({
      name: null,
      url: null,
      clientId: null,
      redirectUri: null,
      authorizationEndpoint: null,
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
      requiredUrlParams: null,
      optionalUrlParams: null,
      scope: null,
      scopePrefix: null,
      scopeDelimiter: null,
      state: null,
      type: null,
      popupOptions: null,
      responseType: 'code',
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri'
      }
    });

  });
