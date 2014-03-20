var Site = angular.module('Site', ['ngAnimate','timer','firebase', 'ngRoute']);


Site.controller('AppController', function($rootScope, $scope, Auth, configValues, $location) {
    $scope.timerRunning = false;

    $scope.refreshAll = function() {
       $scope.$broadcast('refreshAll');
    };

    $scope.playPauseAll = function() {
        $scope.timerRunning = !$scope.timerRunning;

        if($scope.timerRunning){
            $scope.$broadcast('pauseAll');
        } else {
            $scope.$broadcast('playAll');
        }
    };

//    $scope.addPlayer = function() {
//       $scope.$broadcast('addingPlayer');
//    };

    $scope.$on("$firebaseSimpleLogin:login", function(e, user) {
        console.log("User " + user.id + " successfully logged in!");
        configValues.authorizedUser = user;
        $location.path("/tracker");
    });

    $scope.$on("$firebaseSimpleLogin:logout", function(e) {
        console.log('Not logged in'); //not logged in
        configValues.authorizedUser = null;
    });
    $scope.$on("$firebaseSimpleLogin:error", function(e, error) {
        console.log(error);  //had an error
        configValues.authorizedUser = null;
    });

});

Site.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {templateUrl: 'views/login.html'})
        .when('/tracker', {templateUrl: 'views/tracker.html'})
        .when('/profile', {templateUrl: 'views/profile.html'})
        .otherwise({redirectTo: 'login'});
});


Site.run(function($rootScope, $location, Auth, $firebaseSimpleLogin) {

    $rootScope.login = Auth.init(); //this needs to finish before wiring up the $locationChangeStart!

    var promise = $rootScope.login.auth.$getCurrentUser();

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if($location.$$path != "/login" && !$rootScope.login.auth.user){
          $location.path('/login');
        }
    });


});

Site.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
});