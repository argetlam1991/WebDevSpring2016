/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app, mongoose) {

    
    var userModel = {};
    var userSchema = require("./user.schema.server.js")(mongoose);
    var users = mongoose.model("projectUser", userSchema);


    userModel.findUserByCredentials = function (credentials) {
        return users.findOne({
            username : credentials.username,
            password : credentials.password
        });

    };

    userModel.findUserByUsername = function (username) {
        return users.findOne({username : username});
    };

    userModel.findUserById = function (id) {
        return users.findOne({_id : id});
    };

    userModel.findAllUsers = function () {
        return users.find();
    };

    userModel.create = function (user) {
        return users.create(user);
    };

    userModel.update = function (userId, user) {
        delete user._id;
        return users.update({_id : userId}, user);
    }

    userModel.delete = function (id) {
        return users.remove({_id : id});
    };
    
    return userModel;

};