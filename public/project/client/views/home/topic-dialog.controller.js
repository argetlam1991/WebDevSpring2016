/**
 * Created by guhan on 4/23/16.
 */
(function() {
    angular
        .module("TopicApp")
        .controller("TopicDialogController", TopicDialogController);

    function TopicDialogController($scope, $modalInstance) {
        $scope.ok = ok;
        $scope.cancel = cancel;
        $scope.topic = "";

        function ok() {
            $modalInstance.close($scope.topic);
        };

        function cancel() {
            $modalInstance.dismiss('cancel');
        };
    }

})();