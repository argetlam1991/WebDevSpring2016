/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory('UserService', UserService);


    function UserService($http) {
        var service = {};
        
        service.login = function(credentials) {
            return $http.post("/api/assignment/login", credentials);
        }

        service.logout = function() {
            return $http.post("/api/assignment/logout");
        }

        service.register = function(user) {
            return $http.post("/api/assignment/register", user);
        }

        service.updateUser = function(id, user) {
            return $http.put("/api/assignment/user" + id, user);
        }

        service.findAllUsers = function() {
            return $http.get("/api/assignment/admin/user");
        }

        service.add = function(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        service.remove = function(id) {
            return $http.delete("/api/assignment/admin/user/" + id);
        }

        service.update = function(id, user) {
            return $http.put("/api/assignment/admin/user/" + id, user);
        }
        
        return  service;
    }
})();