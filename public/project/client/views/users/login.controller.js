/**
 * Created by guhan on 2/24/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("LoginController", LoginController);
    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(username, password) {
            var credential = {};
            credential.username = username;
            credential.password = password;
            UserService.login(credential)
                .then(function success(response){
                    $rootScope.user = response.data;
                    if ($rootScope.user != null) {
                        $location.path("/home");
                    }
                }, function failed(response){
                    console.log("login failed");
                    console.log(response);
                });
        }

    }
})();