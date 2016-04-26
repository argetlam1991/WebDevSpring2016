/**
 * Created by guhan on 3/6/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();