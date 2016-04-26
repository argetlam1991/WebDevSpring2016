/**
 * Created by guhan on 4/12/16.
 */
(function(){
    angular
        .module("TopicApp")
        .factory('ArticleService', ArticleService);


    function ArticleService($http) {
        var service = {};
        
        service.searchArticle = function(filter, limit, skip) {
            return $http.post("/api/project/articles/search/limit/" + limit + "/skip/" + skip, filter);
        }
        
        service.findAllArticle = function() {
            return $http.get("/api/project/articles/all");
        }

        service.findArticleByAuthor = function(author, limit, skip) {
            return $http.get("/api/project/articles/author/" + author + "/limit/" + limit + /skip/ + skip);
        };

        service.findArticleById = function(id) {
            return $http.get("/api/project/articles/id/" + id);
        };

        service.createArticle = function(article) {
            return $http.post("/api/project/articles/create", article);
        }

        service.deleteArticle = function(id) {
            return $http.delete("/api/project/articles/" + id)
                .success(function(response){
                    console.log("delete " + id);
                });
        }

        service.updateArticle = function(id, article) {
            return $http.put("/api/project/articles/" + id, article);
        }
        
        service.createComment = function(articleId, comment) {
            return $http.post('/api/project/comment/' + articleId + '/comment', comment);
        }

        service.deleteComment = function(id) {
            return $http.delete('/api/project/comment/id/' + id);
        }

        service.getComment = function(id) {
            return $http.get('/api/project/comment/id/' + id);
        }
        
        service.getCommentsByArticle = function(id) {
            return $http.get('/api/project/comment/article/' + id);
        }


        service.getCommentsByAuthor = function(author, limit, skip) {
            return $http.get('/api/project/comment/author/' + author + "/limit/" + limit + "/skip/" + skip);
        }
        
        return  service;
    }
})();