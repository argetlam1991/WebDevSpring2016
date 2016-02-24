/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory('UserService', UserService);
    function UserService($rootScope) {
        var service = {};

        service.currentUsers = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        service.findUserByCredentials = function(username, password, callback) {
            for (var user in this.currentUsers) {
                if (user.username == username && user.password == password) {
                    callback(user);
                }
            }
            callback(null);
        };

        service.finAllUsers = function(callback) {
            callback(this.currentUsers);
        };

        service.createUser = function(user, callback) {
            user._id = (new Date).getTime();
            this.currentUsers.push(user);
            callback(user);
        }

        service.deleteUserById = function(id, callback) {
            var index = -1;
            for (var user in this.currentUsers) {
                if (user._id == id) {
                    index = this.currentUsers.indexOf(user);
                    break;
                }
            }
            if (index > -1) {
                this.currentUsers.splice(index, 1);
            }
            callback(this.currentUsers);
        }

        service.updateUser = function(userId, user, callback) {
            var index = -1;
            for (var user in this.currentUsers) {
                if (user._id == userId) {
                    index = this.currentUsers.indexOf(user);
                    break;
                }
            }
            if (index > -1) {
                this.currentUsers[index] = user;
            }
            callback(this.currentUsers);
        }
        return  service;
    }
})();