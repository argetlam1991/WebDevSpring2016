/**
 * Created by guhan on 3/6/16.
 */
(function(){
    angular
        .module("TopicApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller:"HomeController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/articles/:articleId/article", {
                    templateUrl: "views/article/article.view.html",
                    controller: "ArticleController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/test", {
                    templateUrl: "views/article/test.view.html",
                    controller: "TestController",
                })
                .when("/editor", {
                    templateUrl: "views/editor/editor.view.html",
                    controller: "EditorController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/editor/:id", {
                    templateUrl: "views/editor/editor.view.html",
                    controller: "EditorController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",

                })
                .when("/userMain/:userId", {
                    templateUrl: "views/users/user.main.view.html",
                    controller: "UserMainController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }

                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",

                })
                .otherwise({
                    redirectTo: "/home",
                });
        });

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                console.log(user + "is logged in");
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("failed");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/user/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.user = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };
})();