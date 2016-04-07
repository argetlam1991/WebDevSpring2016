/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app, userModel, db) {

    app.get('/api/assignment/user/usernameAndPassword', function (req, res) {
        userModel.findUserByCredentials(req.query.username, req.query.password, function(data){
            if (data.length == 1) {
                res.json(data[0]);
            } else {
                res.json(null);
            }
        });
    });

    app.get('/api/assignment/user/username', function (req, res) {
        userModel.findUserByUsername(req.query.username, function(data) {
            if (data.length == 1) {
                res.json(data[0]);
            } else {
                res.json(null);
            }
        });
    });

    app.get('/api/assignment/user/allUser', function (req, res) {
        userModel.findAll(function(data) {
            res.json(data);
        })
    });

    app.get('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        userModel.findById(id, function(data) {
            if (data.length == 1) {
                res.json(data[0]);
            } else {
                res.json(null);
            }
        });
    });

    app.post('/api/assignment/user', function (req, res) {
        userModel.create(req.body, function(results) {
            console.log(results);
            res.json(results);
        });

    });

    app.delete('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        userModel.delete(id, function(result) {
            console.log(result);
            res.send("delete " + id);
        });

    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel.update(id, user, function(results) {
            res.json("updated");
        });
    });


};