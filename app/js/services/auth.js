angular.module('Site').factory('Auth', function($firebaseSimpleLogin, $q) {

    //We are going to return an object with the auth data. I am not sure how to clear this on logout?
    return {
        init: function () {

            var _playersRef = new Firebase("https://bballtimetracker.firebaseio.com");
            var _auth = $firebaseSimpleLogin(_playersRef);

            return {
                playersRef: _playersRef,
                auth: _auth
            };

        }
    }

});