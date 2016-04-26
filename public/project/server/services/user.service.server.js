/**
 * Created by guhan on 3/17/16.
 */

module.exports = function(app, userModel, passport) {

    var auth = authorized;
    app.post('/api/project/user/login', passport.authenticate('project'), login);
    app.post('/api/project/user/logout', logout);
    app.post('/api/project/user/register', register);
    app.get('/api/project/user/loggedin', loggedin);
    app.get('/api/project/user/getUser/:id', getUserById);
    app.put('/api/project/user/:userId', auth, updateUser);
    app.get('/api/project/admin/user', auth, findAllUsers);
    app.post('/api/project/admin/user', auth, createUser);
    app.put('/api/project/admin/user/:userId', auth, adminUpdateUser);
    app.delete('/api/project/admin/user/:userId', auth, deleteUser);

    function getUserById(req, res) {
        userModel.findUserById(req.params.id)
            .then(
                function(user) {
                    res.json(user);
                },
                function(response) {
                    res.send(400);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user){
                        res.json(null);
                    } else {
                        return userModel.create(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            );
    }
    
    function updateUser(req, res) {
        var newUser = req.body;
        userModel.update(req.params.userId, newUser)
            .then(
                function(user){
                    return userModel.findUserById(req.params.userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function findAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {

                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(',');
        } else {
            newUser.roles = ['user'];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user == null) {
                        return userModel.create(newUser)
                            .then(
                                function() {
                                    return userModel.findAllUsers();
                                },
                                function(err) {
                                    console.log(err);
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function() {
                    res.status(400).send(err);
                }
            )
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .delete(req.params.userId)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function adminUpdateUser(req, res) {
        var newUser = req.body;
        if(isAdmin(req.user)) {
            userModel
                .update(req.params.userId, newUser)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }



};