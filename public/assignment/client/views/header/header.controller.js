/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.$location = $location;
        $scope.hasLogin = hasLogin;
        $scope.adminLogin = adminLogin;
        $scope.logout = logout;

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

        function logout() {
            $rootScope.user = null;
            $scope.user = null;
            $location.path("/home");

        }
    }
})();