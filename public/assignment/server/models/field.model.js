/**
 * Created by guhan on 4/6/16.
 */
module.exports = function(app, mongoose, formModel) {

    var fieldModel = {};
    var uuid = require('node-uuid');

    fieldModel.findAllFields = function (formId, callback) {
        formModel.findFormById(formId, function(data) {
            if (data.length == 1) {
                var form = data[0];
                callback(form.fields);
            } else {
                callback(null);
            }
        });
    }
    
    fieldModel.findFieldByFieldId = function(id, formId, callback) {
        formModel.findFormById(formId, function(data) {
            if (data.length == 1) {
                var form = data[0];
                var field = this.findFieldInForm(id, form)
                callback(field);
            } else {
                callback(null);
            }
        });
    }

    fieldModel.findFieldInForm = function (id, form) {
        for(var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == id) {
                return form.fields[i];
            }
        }
        return null;
    }

    
    fieldModel.deleteFieldInForm = function (formId, fieldId, callback) {
        formModel.findFormById(formId, function(data) {
            if (data.length == 1) {
                var form = data[0];
                var fieldIndex = -1;
                for(var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        fieldIndex = i;
                    }
                }
                if (fieldIndex == -1) return ;
                form.fields.splice(fieldIndex, 1);
                formModel.updateForm(formId, form, function(result) {
                    callback(result);
                })
            } else {
                callback(null);
            }
        });
    }
    
    fieldModel.createField = function(formId, field, callback) {
        formModel.findFormById(formId, function(data) {
            if (data.length == 1) {
                var form = data[0];
                field._id = uuid.v4();
                form.fields.push(field);
                formModel.updateForm(formId, form, function(result) {
                    callback(result);
                })
            } else {
                callback(null);
            }
        });
    }


    fieldModel.updateFieldOrder = function(formId, pair, callback) {
        formModel.findFormById(formId, function(data) {
            if (data.length == 1) {
                var form = data[0];
                var field = form.fields[pair.oldIndex];
                form.fields.splice(pair.oldIndex, 1);
                form.fields.splice(pair.newIndex, 0, field);
                formModel.updateForm(formId, form, function(result) {
                    callback(result);
                })
            } else {
                callback(null);
            }
        });
    }

    fieldModel.updateField = function(formId, fieldId, field, callback) {
        formModel.findFormById(formId, function(data) {
            if (data.length == 1) {
                var form = data[0];
                var fieldIndex = -1;
                for(var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        fieldIndex = i;
                    }
                }
                if (fieldIndex == -1) {
                    callback(null);
                } else {
                    form.fields[fieldIndex] = field;
                    formModel.updateForm(formId, form, function(result) {
                        callback(result);
                    })
                }
            } else {
                callback(null);
            }
        });

    }
    return fieldModel;

};