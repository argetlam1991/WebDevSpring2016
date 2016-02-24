/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $location,  $rootScope, UserService) {
        $scope.update = update;

        function update(profileUsername,
                        profilePassword, profileFirstName, profileLastName, profileEmail) {
            console.log("click!");
            var user = $rootScope.user;
            UserService.createUser(user, (function(){}));
            $rootScope.user = user;
            $location.path("/profile");
        }
    }
})();