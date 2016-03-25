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
            UserService.findUserByCredentials(username, password)
                .then(function success(response){
                    $rootScope.user = response.data;
                    if ($rootScope.user != null) {
                        $location.path("/profile");
                    }
                }, function failed(response){
                    console.log("login failed");
                    console.log(response);
                });
        }

    }
})();