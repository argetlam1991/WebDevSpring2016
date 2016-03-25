/**
 * Created by guhan on 2/26/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormFieldsController", FormFieldsController);
    function FormFieldsController($scope, $location) {
        $scope.$location = $location;
    }
})();