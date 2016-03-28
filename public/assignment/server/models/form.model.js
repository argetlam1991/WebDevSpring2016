/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app) {
    var uuid = require('node-uuid');

    var formModel = {};

    formModel.forms = require('./form.mock.json');

    formModel.findFormByTitle = function (title) {

        var index = -1;
        for (var i = 0; i < this.forms.length; i++) {
            if (this.forms[i].title == title) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            return this.forms[index];
        } else {
            return null;
        }

    };
    
    formModel.findFieldByFieldId = function (id, form) {
        for(var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == id) {
                return form.fields[i];
            }
        }
        return null;
    }
    
    formModel.findFormById = function (id) {
        var index = -1;
        for (var i = 0; i < this.forms.length; i++) {
            if (this.forms[i]._id == id) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            return this.forms[index];
        } else {
            return null;
        }
    }
    

    formModel.findFormsByUserId = function (userId) {
        var res = [];
        for (var i = 0; i < this.forms.length; i++) {
            if (this.forms[i].userId == userId) {
                res.push(this.forms[i]);
            }
        }
        return res;
    }

    formModel.deleteForm = function (id) {
        var index = -1;
        for(var i = 0; i < this.forms.length; i++) {
            if (this.forms[i]._id == id) {
                index = i;
            }
        }
        if (index > -1) {
            this.forms.splice(index, 1);
        }
    };
    
    formModel.deleteFieldInForm = function (formId, fieldId) {
        var formIndex = -1;
        for(var i = 0; i < this.forms.length; i++) {
            if (this.forms[i]._id == formId) {
                formIndex = i;
                break;
            }
        }
        if (formIndex == -1) return ;
        var fieldIndex = -1;
        for(var i = 0; i < this.forms[formIndex].fields.length; i++) {
            if (this.forms[formIndex].fields[i]._id == fieldId) {
                fieldIndex = i;
            }
        }
        if (fieldIndex == -1) return ;
        this.forms[formIndex].fields.splice(fieldIndex, 1);
        
    }

    formModel.createForm = function(userId, form) {
        form._id = uuid.v4();
        this.forms.push(form);
        return form;
    };
    
    formModel.createField = function(form, field) {
        field._id = uuid.v4();
        form.fields.push(field);
        return field;
    }

    formModel.updateForm = function(formId, form) {
        var index = -1;
        for(var i = 0; i < this.forms.length; i++) {
            if (this.forms[i]._id == formId) {
                index = i;
            }
        }
        if (index > -1) {
            this.forms[index] = form;
        }
    }
    
    formModel.updateField = function(formId, fieldId, field) {
        var formIndex = -1;
        for(var i = 0; i < this.forms.length; i++) {
            if (this.forms[i]._id == formId) {
                formIndex = i;
                break;
            }
        }
        if (formIndex == -1) return ;
        var fieldIndex = -1;
        for(var i = 0; i < this.forms[formIndex].fields.length; i++) {
            if (this.forms[formIndex].fields[i]._id == fieldId) {
                fieldIndex = i;
            }
        }
        if (fieldIndex == -1) return ;
        this.forms[formIndex].fields[fieldIndex] = field;
    }
    return formModel;

};