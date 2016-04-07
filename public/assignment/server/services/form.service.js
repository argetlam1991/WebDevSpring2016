/**
 * Created by guhan on 3/25/16.
 */
module.exports = function(app, formModel, db) {

    app.get('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId, function(data){
            res.json(data);
        });

    });

    app.delete('/api/assignment/form/:formId', function (req, res) {
        var id = req.params.formId;
        formModel.deleteForm(id, function(result){
            res.send(result);
        });

    });

    app.post('/api/assignment/user/:userId/form', function (req, res) {
        var userId = req.params.userId;
        formModel.createForm(userId, req.body, function(result){
            console.log(result);
            res.json(result);
        });

    });
    
    app.put('/api/assignment/form/:formId', function (req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateForm(formId, form, function(result){
            res.send(result);
        });
    });

};