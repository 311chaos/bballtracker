Site.controller('Players', function($scope, $firebase) {

    var playersRef = new Firebase("https://bballtimetracker.firebaseio.com/Players");
    $scope.players = $firebase(playersRef);
    $scope.addingPlayer = false;

    $scope.savePlayers = function() {
        $scope.players.$save();
    }
//    $scope.players.$on("loaded", function() {
//        $scope.$watch('players', function(newValue, oldValue){
//            if(newValue != oldValue) {
//
//                //this is saving twice if you call $add from the add players dialog.
//                $scope.savePlayers();
//            }
//        }, true)
//    });

    $scope.showAddPlayer = function() {
        $scope.addingPlayer = !$scope.addingPlayer;
    }

    $scope.closeAddPlayer = function() {
        $scope.addingPlayer = false;
    };

    $scope.addPlayer = function() {
        if($scope.newPlayerName) {
            $scope.players.$add({name: $scope.newPlayerName, inGame: false, playTime: 0, number:  $scope.getNumber($scope.newPlayerNumber)})
                .then(function(ref) {
                    $scope.addingPlayer = false;
                    $scope.newPlayerNumber = null;
                    $scope.newPlayerName = "";
                });
        }
    }

    $scope.getNumber = function(num){
        if (isNaN(num))
            return 0;
        else
            return num;
    }


});