/**
 * Created by guhan on 2/24/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(username, password) {
            console.log("click!");
            UserService.findUserByCredentials(username, password, (function(u){$rootScope.user = u}));
            if ($rootScope != null) {
                $location.path("/profile");
            }
        }
    }
})();