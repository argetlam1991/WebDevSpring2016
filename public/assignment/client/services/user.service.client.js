/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory('UserService', UserService);


    function UserService($http) {
        var service = {};

        service.findUserByUsername = function(username) {
           
            return $http.get("/api/assignment/user/username?username=" + username);
        };

        service.findUserByCredentials = function(username, password) {

            return $http.get("/api/assignment/user/usernameAndPassword?username=" + username + "&password=" + password);
        };

        service.finAllUsers = function() {

            return $http.get("/api/assignment/user/allUser")
                .success(function(response){
                    var users = response;
                    return users;
                });
        };

        service.createUser = function(user) {
            return $http.post("/api/assignment/user", user);

        }

        service.deleteUserById = function(id) {
            return $http.delete("/api/assignment/user/" + id)
                .success(function(response){
                    console.log("delete " + id);
                });
        }

        service.updateUser = function(id, user) {
            return $http.put("/api/assignment/user/" + id, user);

        }
        return  service;
    }
})();