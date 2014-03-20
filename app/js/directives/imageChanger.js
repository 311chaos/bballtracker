Site.directive("imageChanger", function (fileReader) {
    return{
        restrict: "A",
        require: "?ngModel",
        transclude: true,
        replace:true,
        controller: function($scope, $element){

            //set defaults if they don't have an image saved
            if(!$scope.player.image) {
                $scope.hasImage = false;
                $scope.image = 'img/basketballHead.jpg';
            } else {
                $scope.hasImage = true;
                $scope.image = $scope.player.image;
            }

            //removes the image, then the $watch fires and updates the view
            $scope.removeImage = function() {
                $scope.player.image = null;
            };

            //Watching for changes, we will update the view with the proper image
            $scope.$watch('player.image', function(newValue, oldValue) {
                if(newValue != oldValue) {
                    if(newValue) {
                        $scope.hasImage = true;
                        $scope.image = newValue;
                    } else {
                        $scope.hasImage = false;
                        $scope.image = 'img/basketballHead.jpg';
                    }
                }
            });

            //Change event, fires when an image is selected.
            $element.bind('change', function(e) {
                fileReader.readAsDataUrl(e.srcElement.files[0], $scope)
                    .then(function(result) {
                        $scope.hasImage = true;
                        $scope.player.image = result;
                    });
            });
        },

        template: "<div class='relative playerImage' style='margin-left: 10px;'>" +
//            "<img class='profile' ng-src='{{image}}'>" +
//            "<label style='height: 70px; width: 70px; position: absolute; top:0; left: 0; cursor: pointer;' title='Click to change image...'>" +
//                "<input type='file' accept='image/*;capture=camera' style='display: none;'>" +
//            "</label>" +
            "<div class='text-center playerName'>{{ player.name }}</div>" +
            "<div class='playerNumber center-block'>{{ player.number }}</div>" +
//            "<button class='btn btn-danger btn-xs deleteImage' data-ng-show='hasImage' data-ng-click='removeImage()'>Delete</button>" +
            "</div>",

        link: function (scope, element, ngModel) {

        }
    }
});