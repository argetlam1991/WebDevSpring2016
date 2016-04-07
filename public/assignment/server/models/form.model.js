/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app, mongoose) {

    var formModel = {};
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = require("./form.schema.server.js")(mongoose, FieldSchema);
    var forms = mongoose.model("form", FormSchema);

    formModel.findFormByTitle = function (title, callback) {
        forms.find({title : title}, function (err, data) {
            callback(data);
        })
    };
    
    formModel.findFieldByFieldId = function (id, form) {
        for(var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == id) {
                return form.fields[i];
            }
        }
        return null;
    }
    
    formModel.findFormById = function (id, callback) {
        forms.find({_id : id}, function (err, data) {
            callback(data);
        })
    }
    

    formModel.findFormsByUserId = function (userId, callback) {
        forms.find({userId : userId}, function (err, data) {
            callback(data);
        })
    }

    formModel.deleteForm = function (id, callback) {
        forms.remove({_id : id}, function(err, result){
            callback(result);
        });
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

    formModel.createForm = function(userId, form, callback) {
        forms.create(form, function(err, results) {
            callback(results);
        });
    };
    
    formModel.createField = function(form, field) {
        field._id = uuid.v4();
        form.fields.push(field);
        return field;
    }

    formModel.updateForm = function(formId, form, callback) {
        forms.update({_id : formId}, form, function(err, results) {
            callback(results);
        });
    }

    formModel.updateFieldOrder = function(formId, pair) {
        var formIndex = -1;
        for(var i = 0; i < this.forms.length; i++) {
            if (this.forms[i]._id == formId) {
                formIndex = i;
                break;
            }
        }
        if (formIndex == -1) return ;
        var field = this.forms[formIndex].fields[pair.oldIndex];
        this.forms[formIndex].fields.splice(pair.oldIndex, 1);
        this.forms[formIndex].fields.splice(pair.newIndex, 0, field);
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