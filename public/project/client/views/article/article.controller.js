/**
 * Created by guhan on 4/12/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("ArticleController", ArticleController);

    function ArticleController($scope, $location, $rootScope, $routeParams, $uibModal, ArticleService) {
        $scope.getArticle = getArticle;
        $scope.reFormat = reFormat;
        $scope.isAuthor = isAuthor;
        $scope.addComment = addComment;
        $scope.deletePermission = deletePermission;
        $scope.deleteArticle = deleteArticle;
        $scope.articleId = $routeParams.articleId;

        getArticle();

        function getArticle() {
            ArticleService.findArticleById($scope.articleId)
                .then(function success(response) {
                    $scope.article = response.data;
                    getComments();
                }, function err(response) {
                    console.log(response);
                })
        }

        function reFormat(dateString) {
            date = new Date(dateString);
            return date.toUTCString();
        }

        function isAuthor() {
            return $rootScope.user &&
                    $scope.article &&
                $rootScope.user.username == $scope.article.author;
        }

        function deletePermission() {
            return $rootScope.user &&
                $scope.article &&
                ($rootScope.user.username == $scope.article.author || $rootScope.user.roles.indexOf('admin') != -1);
        }

        function deleteArticle() {
            ArticleService.deleteArticle($scope.article._id)
                .then(
                    function(response) {
                        $location.path("/home");
                    },
                    function(response) {
                        console.log(response);
                    }
                )
        }


        function addComment() {
            var comment = "";
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/article/comment-dialog.view.html',
                controller: 'CommentDialogController',
            });

            modalInstance.result.then(function (comment) {
                var newComment = {
                    author : $rootScope.user.username,
                    article : $scope.article._id,
                    body : comment
                }
                ArticleService.createComment($scope.article._id, newComment)
                    .then(
                        function (response) {
                            getArticle();
                        },
                        function (response) {
                            console.log(response);
                            getArticle();
                        }
                    )
            }, function (err) {
                console.log('Modal dismissed at: ' + new Date() + "response: " + err);
            });
        }



        function getComments() {
            ArticleService.getCommentsByArticle($scope.article._id)
                .then(
                    function(response) {
                        $scope.comments = response.data;
                    },
                    function(response) {
                        console.log(response);
                    }
                )
        }
    }
})();