/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app, userModel, db) {

    app.get('/api/assignment/user/usernameAndPassword', function (req, res) {
        var user = userModel.findUserByCredentials(req.query.username, req.query.password);
        console.log(user);
        res.json(user);

    });

    app.get('/api/assignment/user/username', function (req, res) {
        var user = userModel.findUserByUsername(req.query.username);
        console.log(user);
        res.json(user);

    });

    app.get('/api/assignment/user/allUser', function (req, res) {
        var users = userModel.findAll();
        res.json(users);

    });

    app.get('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        var users = userModel.findById(id);
        res.json(users);

    });

    app.post('/api/assignment/user', function (req, res) {
        var newUser = userModel.create(req.body);
        console.log(newUser);
        res.json(newUser);
    });

    app.delete('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        userModel.delete(id);
        res.send("delete " + id);
    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        console.log(req.body);
        var user = req.body;
        userModel.update(id, user);
        res.json(newUser);
    });


};