/**
 * Created by guhan on 4/26/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("UserMainController", UserMainController);

    function UserMainController($scope, $location, $rootScope, $routeParams, UserService, ArticleService) {
        $scope.setTab = setTab;
        $scope.isTab = isTab;
        $scope.loadMoreArticles = loadMoreArticles;
        $scope.loadMoreComments = loadMoreComments;
        $scope.retrieveEmails = retrieveEmails;
        
        init();
        
        function init() {
            $scope.tab = 'article';
            $scope.articles = [];
            $scope.comments = [];
            $scope.moreArticle = false;
            $scope.moreComment = false;
            $scope.articleSkip = 0;
            $scope.commentSkip = 0;
            getUser();
        }
        
        function setTab(tab) {
            $scope.tab = tab;
        }
        
        function isTab(tab) {
            return $scope.tab == tab;
        }

        function getUser() {
            UserService.findById($routeParams.userId)
                .then(
                    function (response) {
                        $scope.user = response.data;
                        getArticles();
                        getComments();
                    }
                )
        }
        
        function loadMoreArticles() {
            if ($scope.moreArticle) {
                $scope.moreArticle = false;
                getArticles();
            }
        }

        function loadMoreComments() {
            if ($scope.moreComment) {
                $scope.moreComment = false;
                getArticles();
            }
        }

        function getArticles() {
            if ($scope.user) {
                ArticleService.findArticleByAuthor($scope.user.username, 5, $scope.articleSkip)
                    .then(function success(response) {
                        if (response.data.length > 0) {
                            $scope.articles.push.apply($scope.articles, response.data);
                            $scope.articleSkip = $scope.articleSkip + 5;
                            $scope.moreArticle = true;
                        } else {
                            $scope.moreArticle = false;
                        }
                    }, function err(response) {
                        console.log(response);
                    })
            }
        }

        function getComments() {
            if ($scope.user) {
                ArticleService.getCommentsByAuthor($scope.user.username, 5, $scope.commentSkip)
                    .then(function success(response) {
                        if (response.data.length > 0) {
                            $scope.comments.push.apply($scope.comments, response.data);
                            $scope.commentSkip = $scope.commentSkip + 5;
                            $scope.moreComment= true;
                        } else {
                            $scope.moreComment = false;
                        }
                    }, function err(response) {
                        console.log(response);
                    })
            }
        }

        function retrieveEmails() {
            if ($scope.user) {
                var output ="";
                for(var i = 0; i < $scope.user.emails.length; i++) {
                    if (i > 0) {
                        output += " | ";
                    }
                    output +=  $scope.user.emails[i];
                }
                return output;
            }

        }
    }
})();