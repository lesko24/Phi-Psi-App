'use strict';

var phiapp = angular.module('myApp.view1', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ngAria',
        'firebase',
        'phiControllers'
    ]);

phiapp.run(function($rootScope){
  $rootScope.loggedIn = false;
  console.log( $rootScope.loggedIn);
});

phiapp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  
  $stateProvider
 
    .state('home', {
      url: '/home',
      templateUrl: 'html/home.html',
      controller: 'HomeCtrl'
    })
    .state('about', {
      url:'/about',
      templateUrl: 'html/about.html',
      controller: 'AboutCtrl'
    })
    .state('alumni', {
      url:'/alumni',
      templateUrl: 'html/alumni.html',
      controller: 'AlumniCtrl'
    })
    .state('login', {
      url:'/login',
      templateUrl: 'html/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url:'/register',
      templateUrl: 'html/register.html',
      controller: 'RegisterCtrl'
    })
    .state('database', {
      url:'/database',
      templateUrl: 'html/database.html',
      controller: 'DatabaseCtrl'
    });
})

