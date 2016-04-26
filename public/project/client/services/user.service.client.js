/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("TopicApp")
        .factory('UserService', UserService);


    function UserService($http) {
        var service = {};
        
        service.login = function(credentials) {
            return $http.post("/api/project/user/login", credentials);
        }

        service.logout = function() {
            return $http.post("/api/project/user/logout");
        }

        service.register = function(user) {
            return $http.post("/api/project/user/register", user);
        }

        service.updateUser = function(id, user) {
            return $http.put("/api/project/user/" + id, user);
        }
        
        service.findById = function(id) {
            return $http.get("/api/project/user/getUser/" + id);
        }
        
        service.findAllUsers = function() {
            return $http.get("/api/project/admin/user");
        }

        service.add = function(user) {
            return $http.post("/api/project/admin/user", user);
        }

        service.remove = function(id) {
            return $http.delete("/api/project/admin/user/" + id);
        }

        service.update = function(id, user) {
            return $http.put("/api/project/admin/user/" + id, user);
        }
        
        return  service;
    }
})();