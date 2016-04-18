/**
 * Created by guhan on 3/17/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/loggedin', loggedin);
    app.put('/api/assignment/user/:userId', auth, updateUser);
    app.get('/api/assignment/admin/user', auth, findAllUsers);
    app.post('/api/assignment/admin/user', auth, createUser);
    app.put('/api/assignment/admin/user/:userId', auth, adminUpdateUser);
    app.delete('/api/assignment/admin/user/:userId', auth, deleteUser);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel.findUserByCredentials({username : username, password: password})
            .then(
                function(user) {
                    if (!user) {return done(null, false); }
                    return             done(null, user);
                },
                function(err) {
                    if (err) {return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(null, err);
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
        newUser.roles = ['student'];
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
                    return userModel.findUserById(user._id);
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
            newUser.roles = ['student'];
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