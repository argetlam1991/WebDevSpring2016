/**
 * Created by guhan on 4/16/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            UserService
                .remove(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            UserService
                .update(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            UserService
                .add(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
        
    }
})();