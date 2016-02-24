/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();