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
        vm.testFomrs = [{"_id": "020", "title": "CDs",      "userId": 234}];
        function addForm(formName) {
            console.log("click!");
            var newForm = {};
            newForm.userId = $rootScope.user._id;
            newForm.title = formName;
            FormService.createFormForUser($rootScope.user._id, newForm, (function(){}));

        }

        function updateForm() {

        }

        function deleteForm() {

        }

        function selectForm($index) {
            var form = FormService.forms[$index];
            console.log(form.title);

        }
    }
})();