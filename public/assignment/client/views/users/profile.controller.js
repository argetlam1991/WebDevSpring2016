/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        $scope.update = update;
        console.log($rootScope.user);
        $scope.profileUsername = $rootScope.user.username;
        $scope.profilePassword = $rootScope.user.password;
        $scope.profileFirstName = $rootScope.user.firstName;
        $scope.profileLastName = $rootScope.user.lastName;
        $scope.profileEmail = $rootScope.user.emails;

        function update(profileUsername,
                        profilePassword, profileFirstName, profileLastName) {
            console.log("click!");
            var user = {};
            user.username = profileUsername;
            user.password = profilePassword;
            user.firstName = profileFirstName;
            user.lastName = profileLastName;
            user.emails = [$scope.profileEmail];
            UserService.updateUser($rootScope.user._id, user)
                .success(function(response){
                    console.log(response);
                });
            $rootScope.user = user;
        }
    }
})();