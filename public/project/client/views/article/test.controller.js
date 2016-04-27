/**
 * Created by guhan on 4/26/16.
 */
(function(){
    angular
        .module("TopicApp")
        .controller("TestController", TestController);

    function TestController($scope, YoutubeService) {
        $scope.view = 'Test';
        $scope.formattitle = formattitle;
        

        search();

        function search() {
            YoutubeService.searchVideo(["worldOfwarships"])
                .then(function (response) {
                    $scope.items = response.data;
                    console.log(response.data);
                },
                function (response) {
                    console.log(response);
                })
        }

        function formattitle(title) {
            if (title.length > 32) {
                return title.substring(0,30) + "...";
            } else {
                var i = title.length;
                while(i < 32) {
                    title += " ";
                    i++;
                }
                return title;
            }
        }

    }

})();