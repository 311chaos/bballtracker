Site.directive("ctTimerButton", function () {
    return{
        restrict: "A",
        transclude: true,
        require: "?ngModel",
        replace:true,
        controller: function ($scope) {
            $scope.isTiming = false;
        },

        template: "<button class='btn btn-default' ng-class='{\"btn-success\":isTiming}' ng-click='toggleTimer()'>" +
                    '<div style="margin-bottom: 10px; font-size: 20px;">'+
                        '<timer interval="1000" autostart="false">{{minutes}}:{{seconds | numberFixedLen:2}}</timer>'+
                    '</div>'+
                    '<i class="fa fa-clock-o"></i>' +
                   '</button>',

        link: function (scope, element, attrs) {

            scope.hasStarted = false;

            //TODO - We need to listen for global stop, reset, and MAYBE resume events. We will need to update isTiming and hasStarted variables.
            //TODO - Additionally, we might need a reference to the player at this point,  to know if they are in the game or not (to react to a resume that should only play if a player is 'IN'

            scope.toggleTimer = function() {
                if(scope.isTiming){
                    element.find('timer')[0].stop();
                    scope.isTiming = false;
                } else {
                    //need to know if its the first time starting, or if we are resuming.
                    if(scope.hasStarted){
                        element.find('timer')[0].resume();
                        scope.isTiming = true;
                    } else {
                        element.find('timer')[0].start();
                        scope.hasStarted = true;
                        scope.isTiming = true
                    }

                }
            }

            scope.$on('refreshAll', function() {
                element.find('timer')[0].reset();
                scope.isTiming = false;
                scope.hasStarted = false;
            });

            scope.$on('pauseAll', function() {
                element.find('timer')[0].stop();
            });

        }
    }
});