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
            UserService.findUserByCredentials(username, password, function(user) {
                $rootScope.user = user;
                if ($rootScope.user != null) {
                    $location.path("/profile");
                }
            })
        }
    }
})();