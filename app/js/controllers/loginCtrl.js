Site.controller('login', function($rootScope, $scope) {


    $scope.fbLogin = function() {
        $scope.login.auth.$login('facebook');
    };

    $scope.fbLogout = function() {
        $scope.login.auth.$logout();
    };


});