/**
 * Created by guhan on 2/24/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.formService = FormService;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var vm = this;

        function addForm(formName) {
            console.log("addFrom!");
            var newForm = {};
            newForm.userId = $rootScope.user._id;
            newForm.title = formName;
            FormService.createFormForUser($rootScope.user._id, newForm, (function(){}));

        }

        function updateForm(formName) {
            if ($scope.selected != null) {
                $scope.selected.title = formName;
                $scope.formService.updateFormById($scope.selected._id, $scope.selected, function(){});
            }

        }

        function deleteForm(index) {
            var id = FormService.forms[index]._id;
            $scope.formService.deleteFormById(id, (function(){}));

        }

        function selectForm(index, formName) {
            console.log(index);
            $scope.selected = $scope.formService.forms[index];
            $scope.formName = $scope.selected.title;
        }
    }
})();