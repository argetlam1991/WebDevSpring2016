/**
 * Created by guhan on 2/26/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $location, $routeParams, FieldService,  $uibModal, $log) {
        $scope.$location = $location;
        $scope.model = {};
        $scope.getField = getField;
        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.editField = editField;

        var formId = $routeParams.formId;
        getField();

        function getField() {
            FieldService.getFieldsForForm(formId)
                .then(function success(response) {
                    $scope.model.fields = response.data;
                }, function failed(response) {
                    console.log("Cannot get fields");
                    console.log(response);
                })
        }

        function addField(fieldType) {
            var newField = {};
            switch(fieldType) {
                case "Single Line Text":
                    newField = createSingLineText();
                    break;
                case "Paragraph Text":
                    newField = createMultiLineText();
                    break;
                case "Date":
                    newField = createDate();
                    break;
                case "Dropdown":
                    newField = createDropdown();
                    break;
                case "Checkboxes":
                    newField = createCheckboxes();
                    break;
                case "Radio buttons":
                    newField = createRadio();
            }
            FieldService.createFieldForForm(formId, newField)
                .then(function success(response) {
                    getField();
                }, function failed(response) {
                    getField();
                })
        }

        function createSingLineText() {
            return {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
        }

        function createMultiLineText() {
            return {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
        }

        function createDate() {
            return {"_id": null, "label": "New Date Field", "type": "DATE"};
        }

        function createDropdown() {
            return {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};
        }

        function createCheckboxes() {
            return {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};
        }

        function createRadio() {
            return {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};
        }

        function deleteField(field) {
            var fieldId = field._id;
            FieldService.deleteFieldFromForm(formId, fieldId)
                .then(function success(response) {
                    getField();
                }, function failed(response) {
                    getField();
                })
        }

        function editField(field) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/forms/dialog.html',
                controller: 'FieldDialogController',
                scope: $scope,
                resolve: {
                    field: function () {
                        return field;
                    }
                }
            });

            modalInstance.result.then(function (field) {
                FieldService.updateField(formId, field._id, field)
                    .then(function success(response) {
                        getField();
                    }, function failed(response) {
                        getField();
                    })
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    }
})();