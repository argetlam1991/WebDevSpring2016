/**
 * Created by guhan on 3/25/16.
 */
module.exports = function(app, formModel, db) {

    app.get('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        var forms = formModel.findFormsByUserId(userId);
        console.log(forms);
        res.json(forms);
    });

    app.delete('/api/assignment/form/:formId', function (req, res) {
        var id = req.params.formId;
        console.log("delete " + id);
        formModel.deleteForm(id);
        console.log(formModel.forms);
        res.send("delete " + id);
    });

    app.post('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        var newForm= formModel.createForm(userId, req.body);
        console.log(newForm);
        res.json(newForm);
    });
    
    app.put('/api/assignment/form/:formId', function (req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateForm(formId, form);
    });

};