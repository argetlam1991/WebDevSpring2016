/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();