/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location,  $rootScope, UserService) {
        $scope.register = register;

        function register(registerUsername, registerPassword, registerVerify, registerEmail) {
            console.log("click!");
            var user = {
                "firstName": "",
                "lastName": "",
                "username": registerUsername,
                "password": registerPassword,
                "emails": [registerEmail],
                "roles": ["student"]
            };
            console.log(user);
            UserService.createUser(user)
                .then(function(response){
                    var newuser = response.data;
                    if (newuser != null) {
                        $rootScope.user = response.data;
                        $location.path("/profile");
                    }
                }, function(response) {
                    console.log("regiset failed");
                    console.log(response);
                });

        }
    }
})();