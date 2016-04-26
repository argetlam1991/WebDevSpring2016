/**
 * Created by guhan on 4/21/16.
 */
(function() {
    angular
        .module("TopicApp")
        .controller("CommentDialogController", CommentDialogController);

    function CommentDialogController($scope, $modalInstance) {
        $scope.ok = ok;
        $scope.cancel = cancel;
        $scope.comment = "";

        function ok(){
            $modalInstance.close($scope.comment);
        };

        function cancel() {
            $modalInstance.dismiss('cancel');
        };
    }

})();