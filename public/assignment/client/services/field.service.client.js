/**
 * Created by guhan on 3/26/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory('FieldService', FieldService);


    function FieldService($http) {
        var service = {};

        service.createFieldForForm = function(formId, field) {
            return $http.post('/api/assignment/form/' + formId + '/field', field);
        };

        service.getFieldsForForm = function(formId) {
            return $http.get('/api/assignment/form/' + formId + '/field');
        };

        service.getFieldForForm = function(formId, fieldId) {
            return $http.get('/api/assignment/form/' + formId + '/field/' + fieldId);
        };

        service.deleteFieldFromForm = function(formId, fieldId) {
            return $http.delete('/api/assignment/form/' + formId + '/field/' + fieldId);
        };

        service.updateField = function(formId, fieldId, field) {
            return $http.put('/api/assignment/form/' + formId + '/field/' + fieldId, field);
        };

        return  service;
    }
})();