/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $scope.hasLogin = hasLogin;
        $scope.adminLogin = adminLogin;

        function hasLogin() {
            return $rootScope.user;
        }

        function adminLogin() {
            if ($rootScope.user == null) {
                return false;
            } else if ($rootScope.user.roles.indexOf("admin") == -1) {
                return false;
            } else {
                return true;
            }
        }

    }
})();