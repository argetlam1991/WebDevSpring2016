/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
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
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.user = null;
                        $location.path("/home");
                    },
                    function(err) {
                        console.log(err);
                    }
                )
        }
    }
})();