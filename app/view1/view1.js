'use strict';

var phiapp = angular.module('myApp.view1', ['ui.router'])

phiapp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  
  $stateProvider
 
    .state('home', {
      url: '/home',
      templateUrl: 'view1/home.html',
      controller: 'HomeCtrl'
    })
    .state('about', {
      url:'/about',
      templateUrl: 'view1/about.html',
      controller: 'AboutCtrl'
    });
})

phiapp.controller('HomeCtrl', function($scope) {
  $scope.message = 'Look how good I look!';
  $scope.pageClass = 'page-home';
});

phiapp.controller('AboutCtrl', function($scope) {
  $scope.message = 'Look how good I look!';
});
