/**
 * Created by guhan on 2/24/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory('FormService', FormService);
    function FormService($rootScope) {
        var service = {};

        service.forms = [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ];

        service.createFormForUser = function(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            this.forms.push(form);
            callback(form);

        };

        service.findAllFormsForUser = function(userId, callback) {
            var formsForUser = [];
            for (var i = 0; i  < this.forms.length; i++) {
                if (this.forms[i].userId == userId) {
                    formsForUser.push(forms[i]);
                }
            }
            callback(formsForUser);
        };

        service.deleteFormById = function(formId, callback) {
            var index = -1;
            for(var i = 0; i < this.forms.length; i++) {
                if (this.forms[i]._id == formId) {
                    index = i;
                }
            }
            if (index > -1) {
                this.forms.splice(index, 1);
            }
            callback(this.forms);
        };

        service.updateFormById = function(formId, newForm, callback) {
            var index = -1;
            for(var i = 0; i < this.forms.length; i++) {
                if (this.forms[i]._id == formId) {
                    index = i;
                }
            }
            if (index > -1) {
                this.forms[index] = newForm;
            }
            callback(this.forms);
        };

        return  service;
    }
})();