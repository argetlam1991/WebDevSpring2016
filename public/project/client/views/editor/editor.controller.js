/**
 * Created by guhan on 4/11/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("EditorController", EditorController);

    function EditorController($scope, $location, $routeParams, $rootScope, ArticleService) {
        $scope.submit = submit;
        $scope.addTopic = addTopic;
        $scope.editor = "Easy (and free!) You should check out our premium features.";

        init();

        function init() {
            if($routeParams.id) {
                ArticleService.findArticleById($routeParams.id)
                    .then(function success(response) {
                        $scope.article = response.data;
                    }, function err(response) {
                        console.log(response);
                    })
            } else {
                $scope.article = {
                    title : "",
                    body : "",
                    topics : [],
                    author : $rootScope.user.username
                };
            }
        }

        function submit() {
            if($routeParams.id) {
                ArticleService.updateArticle($routeParams.id, $scope.article)
                    .then(function success(response) {
                        $location.path("/home");
                    });
            } else {
                ArticleService.createArticle($scope.article)
                    .then(function success(response) {
                        $location.path("/home");
                    });
            }
        }
        
        function addTopic(t) {
            $scope.article.topics.push(t);
        }
        
    }
})();