/**
 * Created by guhan on 3/26/16.
 */
module.exports = function(app, fieldModel) {

    app.get('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        fieldModel.findAllFields(formId, function(data) {
            res.json(data);
        })
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldByFieldId(fieldId, formId, function(data) {
            if (data.length == 1) {
                res.json(field);
            } else {
                res.json(null);
            }
        })
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldInForm(formId, fieldId, function(result){
            res.send(result);
        });

    });

    app.post('/api/assignment/form/:formId/field', function (req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createField(formId, field, function(result) {
            res.json(result);
        })
        
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateField(formId, fieldId, field, function(result) {
            res.send(result);
        });
    });

    app.put('/api/assignment/form/:formId/updateFieldOrder', function (req, res) {
        console.log("update order");
        var formId = req.params.formId;
        var pair = req.body;
        fieldModel.updateFieldOrder(formId, pair, function(result) {
            res.send(result);
        });
    });



};