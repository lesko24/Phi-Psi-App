'use strict';
var phiControllers = angular.module('phiControllers',[
        'ngMaterial',
        'ngAnimate',
        'ngAria',
    ]);

phiControllers.controller('HomeCtrl', function($scope) {
    $scope.message = 'Look how good I look!';
    $scope.pageClass = 'page-home';
});

phiControllers.controller('AboutCtrl', function($scope) {
    $scope.message = 'Look how good I look!';
});
phiControllers.controller('AlumniCtrl', function($scope) {
    $scope.message = 'Look how good I look!';
});


phiControllers.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', function($scope,$location,$firebaseAuth) {
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

phiControllers.controller('LoginCtrl',['$scope','$rootScope','$firebaseAuth','$location',
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
                        $rootScope.email = $scope.user.email;
                        $location.path('/home');
                    }
                });
            }
            $scope.FacebookSignIn = function(e){
                ref.authWithOAuthPopup("facebook",function(err,authData){
                    if (err) {
                        console.err("Login Failed");
                    } else {
                        console.log('Authentication Successfull ');
                        $rootScope.loggedIn = true;
                    }
                });
            }
            $scope.SignOut = function() {
                ref.unauth();
                $rootScope.loggedIn = false;
            }

        }]);


phiControllers.controller('DatabaseCtrl',function($scope, $firebaseObject) {
    
    var ref = new Firebase("https://popping-inferno-3537.firebaseio.com");
    $scope.data = $firebaseObject(ref);

    this.tiles = buildGridModel({
        icon : "avatar:svg-",
        title: "Svg-",
        background: ""
    });

    function buildGridModel(tileTmpl){
        var it, results = [ ];

        for (var j=0; j<11; j++) {

            it = angular.extend({},tileTmpl);
            it.icon  = it.icon + (j+1);
            it.title = it.title + (j+1);
            it.span  = { row : 1, col : 1 };

            switch(j+1) {
                case 1:
                    it.background = "red";
                    it.span.row = it.span.col = 2;
                    break;

                case 2: it.background = "green";         break;
                case 3: it.background = "darkBlue";      break;
                case 4:
                        it.background = "blue";
                        it.span.col = 2;
                        break;

                case 5:
                        it.background = "yellow";
                        it.span.row = it.span.col = 2;
                        break;

                case 6: it.background = "pink";          break;
                case 7: it.background = "darkBlue";      break;
                case 8: it.background = "purple";        break;
                case 9: it.background = "deepBlue";      break;
                case 10: it.background = "lightPurple";  break;
                case 11: it.background = "yellow";       break;
            }

            results.push(it);
        }
        return results;
    }
});
