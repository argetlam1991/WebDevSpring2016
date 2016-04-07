/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app, mongoose) {

    
    var userModel = {};
    var userSchema = require("./user.schema.server.js")(mongoose);
    var users = mongoose.model("user", userSchema);


    userModel.findUserByCredentials = function (username, password, callback) {
        users.find({'username' : username, 'password' : password}, function (err, data) {
            callback(data);
        })

    };

    userModel.findUserByUsername = function (username, callback) {
        users.find({'username' : username}, function (err, data) {
            callback(data);
        })
    };

    userModel.findById = function (id, callback) {
        users.find({'_id' : id}, function (err, data) {
            callback(data);
        })
    };

    userModel.findAll = function (callback) {
        users.find(function(err, data) {
            callback(data);
        });
    };

    userModel.create = function (user, callback) {
        users.create(user, function(err, results) {
            callback(results);
        });
    };

    userModel.update = function (userId, user, callback) {
        users.update({_id : userId}, user, function(err, results) {
            callback(results);
        });
    }

    userModel.delete = function (id, callback) {
        users.remove({_id : id}, function(err, result){
            callback(result);
        });
    };

    return userModel;

};