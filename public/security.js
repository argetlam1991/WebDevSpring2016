/**
 * Created by guhan on 4/26/16.
 */
module.exports = function(app, assignmentModel, projectModel) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function assignmentLocalStrategy(username, password, done) {
        assignmentModel.findUserByCredentials({username : username, password: password})
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

    function projectLocalStrategy(username, password, done) {
        projectModel.findUserByCredentials({username : username, password: password})
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
        if (user.type == 'project') {
            projectModel.findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(null, err);
                    }
                )

        } else {
            assignmentModel.findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(null, err);
                    }
                )
        }

    }
    
    return passport;
}