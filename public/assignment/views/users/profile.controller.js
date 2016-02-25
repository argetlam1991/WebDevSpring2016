/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);
    function ProfileController($scope, $rootScope, UserService) {
        $scope.update = update;

        function update(profileUsername,
                        profilePassword, profileFirstName, profileLastName) {
            console.log("click!");
            var user = $rootScope.user;
            user.username = profileUsername;
            user.password = profilePassword;
            user.firstName = profileFirstName;
            user.lastName = profileLastName;
            UserService.updateUser(user._id, user, (function(){}));
            $rootScope.user = user;
        }
    }
})();