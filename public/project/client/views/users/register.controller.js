/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("RegisterController", RegisterController);
    function RegisterController($scope, $location,  $rootScope, UserService) {
        $scope.register = register;

        function register(registerUsername, registerPassword, registerVerify, registerEmail) {
            var user = {
                "username": registerUsername,
                "password": registerPassword,
                "emails": [registerEmail],
            };
            UserService.register(user)
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