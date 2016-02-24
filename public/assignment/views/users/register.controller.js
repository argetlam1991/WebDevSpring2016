/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location,  $rootScope, UserService) {
        $scope.register = register;

        function register(registerUsername, registerPassword, registerVerify) {
            console.log("click!");
            var user = {
                "firstName": "",
                "lastName": "",
                "username": registerUsername,
                "password": registerPassword,
                "roles": ["student"]
            };
            UserService.createUser(user, (function(){}));
            $rootScope.user = user;
            $location.path("/profile");
        }
    }
})();