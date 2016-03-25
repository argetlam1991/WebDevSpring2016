/**
 * Created by guhan on 2/24/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.$location = $location;
        $scope.formService = FormService;
        $scope.addForm = addForm;
        $scope.findForms = findForms;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        findForms();

        function findForms() {
            var userId = $rootScope.user._id;
            FormService.findAllFormsForUser(userId)
                .then(function success(response) {
                    $scope.forms =  response.data;
                }, function failed(response) {
                    console.log("Get forms failed");
                    console.log(response);
                });
        }

        function addForm(formName) {
            console.log("addFrom!");
            var newForm = {};
            newForm.userId = $rootScope.user._id;
            newForm.title = formName;
            FormService.createFormForUser($rootScope.user._id, newForm)
                .then(function success(response){
                    console.log("create form success");
                    findForms();
                }, function failed(response){
                    console.log("login failed");
                    console.log(response);
                });
        }

        function updateForm(formName) {
            if ($scope.selected != null) {
                $scope.selected.title = formName;
                $scope.formService.updateFormById($scope.selected._id, $scope.selected)
                    .then(function success(response) {
                        findForms();
                        console.log("update success");
                    }, function failed(response){
                        console.log("update failed");
                        console.log(response);
                    });
            }

        }

        function deleteForm(index) {
            var id = $scope.forms[index]._id;
            $scope.formService.deleteFormById(id)
                .then(function success(response) {
                    findForms();
                    console.log("delete success");
                }, function failed(response){
                    console.log("delete failed");
                    console.log(response);
                })

        }

        function selectForm(index) {
            $scope.selected = $scope.forms[index];
            $scope.formName = $scope.selected.title;
        }
    }
})();