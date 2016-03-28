/**
 * Created by guhan on 3/26/16.
 */
module.exports = function(app, formModel, db) {

    app.get('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        res.json(fields);
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var field = formModel.findFieldByFieldId(fieldId, form);
        res.json(field);
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldInForm(formId, fieldId);
        res.send("delete field");
    });

    app.post('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var form = formModel.findFormById(formId);
        var newField = formModel.createField(form, field);
        res.json(newField);
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateField(formId, fieldId, field);
        res.send("update field");
    });



};