/**
 * Created by guhan on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                   // controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                   // controller: "AdminController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    //controller: "LoginController"
                })
                .otherwise({
                    redirectTo: "index.html",
                });
        });
})();