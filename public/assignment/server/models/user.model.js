/**
 * Created by guhan on 3/17/16.
 */
module.exports = function(app) {

    var userModel = {};

    userModel.users = require("./user.mock.json");

    userModel.findUserByCredentials = function (username, password) {
        var index = -1;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username == username && this.users[i].password == password) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            return this.users[index];
        }
        return null;

    };

    userModel.findUserByUsername = function (username) {
        var index = -1;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username == username) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            return this.users[index];
        }
        return null;
    };

    userModel.findById = function (id) {
        var index = -1;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i]._id == id) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            return this.users[index];
        }
        return null;
    };

    userModel.findAll = function () {
        return this.users;
    };

    userModel.create = function (user) {
        var newUser = user;
        newUser._id = (new Date).getTime();
        this.users.push(newUser);
        return newUser;
    };

    userModel.update = function (userId, user) {
        var index = -1;
        for(var i = 0; i < this.users.length; i++) {
            if (this.users[i]._id == userId) {
                index = i;
            }
        }
        if (index > -1) {
            this.users[index] = user;
        }
    };

    userModel.delete = function (id) {
        var index = -1;
        for(var i = 0; i < this.currentUsers.length; i++) {
            if (this.currentUsers[i]._id == id) {
                index = i;
            }
        }
        if (index > -1) {
            this.currentUsers.splice(index, 1);
        }
    };

    return userModel;

};