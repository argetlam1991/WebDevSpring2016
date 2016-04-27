/**
 * Created by guhan on 4/26/16.
 */
(function(){
    angular
        .module("TopicApp")
        .factory('YoutubeService', YoutubeService);


    function YoutubeService($http) {
        var service = {};
        
        service.searchVideo = function(topics) {
            return $http.post("/api/project/youtubeapi/search", topics);
        }
        
        return  service;
    }
})();