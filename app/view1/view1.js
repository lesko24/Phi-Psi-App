'use strict';

var phiapp = angular.module('myApp.view1', ['ui.router','firebase'])
phiapp.run(function($rootScope){
  $rootScope.loggedIn = false;
});

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
    })
    .state('alumni', {
      url:'/alumni',
      templateUrl: 'view1/alumni.html',
      controller: 'AlumniCtrl'
    })
    .state('login', {
      url:'/login',
      templateUrl: 'view1/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url:'/register',
      templateUrl: 'view1/register.html',
      controller: 'RegisterCtrl'
    });
})

phiapp.controller('HomeCtrl', function($scope) {
  $scope.message = 'Look how good I look!';
  $scope.pageClass = 'page-home';
});

phiapp.controller('AboutCtrl', function($scope) {
  $scope.message = 'Look how good I look!';
});
phiapp.controller('AlumniCtrl', function($scope) {
  $scope.message = 'Look how good I look!';
});

phiapp.controller('LoginCtrl',['$scope','$rootScope','$firebaseAuth','$location',
		function($scope,$rootScope,$firebaseAuth,$location) {

	var ref = new Firebase("https://popping-inferno-3537.firebaseio.com");
	var auth = $firebaseAuth(ref);
	
	$scope.user = {};
	$scope.SignIn = function(e) {
		ref.authWithPassword({
			email : $scope.user.email,
			password : $scope.user.password
		}, function(error, authData) {
			if (error) {
				console.log('Authentication faulure');
                                $rootScope.loggedIn = false;
			} else {
				console.log('Authentication Successfull');
                                $rootScope.loggedIn = true;
                                $rootScope.uid = authData.uid;
				$location.path('/home');
			}
		});
	}

}]);

phiapp.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', function($scope,$location,$firebaseAuth) {
	var firebaseObj = new Firebase("https://popping-inferno-3537.firebaseio.com");
	var auth = $firebaseAuth(firebaseObj);
	$scope.signUp = function() {
		if (!$scope.regForm.$invalid) {
			var email = $scope.user.email;
			var password = $scope.user.password;
			if (email && password) {
				auth.$createUser({
					email : email,
					password : password
				})
					.then(function() {
						// do things if success
						console.log('User creation success');
						$location.path('/home');
					}, function(error) {
						// do things if failure
						console.log(error);
						$scope.regError = true;
						$scope.regErrorMessage = error.message;
					});
			}
		}
	};
}]);
