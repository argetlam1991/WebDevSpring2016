/**
 * Created by guhan on 2/24/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory('FormService', FormService);
    function FormService($http) {
        var service = {};

        service.createFormForUser = function(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        };

        service.findAllFormsForUser = function(userId) {
            return $http.get('/api/assignment/user/' + userId + '/form');
        };

        service.deleteFormById = function(formId) {
            return $http.delete('/api/assignment/form/' + formId);
        };

        service.updateFormById = function(formId, newForm) {
            return $http.put('/api/assignment/form/' + formId, newForm);
        };

        return  service;
    }
})();