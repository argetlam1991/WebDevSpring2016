/**
 * Created by guhan on 4/13/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, $rootScope, $uibModal, ArticleService, UserService) {
        $scope.init = init;
        $scope.getArticles = getArticles;
        $scope.loadMore = loadMore;
        $scope.addTopic = addTopic;
        $scope.removeTopic = removeTopic;
        init();
        
        function init() {
            $scope.articles = [];
            $scope.currentPosition = 0;
            $scope.continueLoad = true;
            $scope.topics = [];
            if ($rootScope.user) {
                $scope.topics = $rootScope.user.topics;
            }
            getArticles();
        }

        function getArticles() {
            ArticleService.searchArticle($scope.topics, 5, $scope.currentPosition)
                .then(function success(response) {
                    if (response.data.length > 0) {
                        $scope.articles.push.apply($scope.articles, response.data);
                    } else {
                        $scope.continueLoad = false;
                    }
                }, function err(response) {
                    console.log(response);
                })
        }

        function loadMore() {
            if ($scope.continueLoad) {
                $scope.currentPosition = $scope.currentPosition + 5;
                getArticles();
            }
        }

        function removeTopic(index) {
            $scope.topics.splice(index, 1);
            $scope.continueLoad = true;
            $scope.currentPosition = 0;
            $scope.articles = [];
            if ($rootScope.user) {
                $rootScope.user.topics = $scope.topics;
                UserService.updateUser($rootScope.user._id, $rootScope.user)
                    .then(
                        function (response) {
                            $rootScope.user = response.data;
                        },
                        function (response) {
                            console.log(response);
                        }
                    )
            }
            getArticles();
        }
        
        function addTopic() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/home/topic-dialog.view.html',
                controller: 'TopicDialogController'
            });

            modalInstance.result.then(
                function (topic) {
                    $scope.topics.push(topic);
                    $scope.continueLoad = true;
                    $scope.currentPosition = 0;
                    $scope.articles = [];
                    getArticles();
                    if ($rootScope.user) {
                        $rootScope.user.topics = $scope.topics;
                        UserService.updateUser($rootScope.user._id, $rootScope.user)
                            .then(
                                function (response) {
                                    $rootScope.user = response.data;
                                },
                                function (response) {
                                    console.log(response);
                                }
                            )
                    }
                }, function (err) {
                    console.log('Modal dismissed at: ' + new Date() + "response: " + err);
                });
        }
    }
})();