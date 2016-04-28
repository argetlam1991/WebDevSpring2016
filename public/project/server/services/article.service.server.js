/**
 * Created by guhan on 4/11/16.
 */



module.exports = function(app, userModel, articleModel, commentModel) {

    var auth = authorized;
    app.get('/api/project/articles/author/:author/limit/:limit/skip/:skip', getArticleByAuthor);
    app.get('/api/project/articles/all', getAllArticle);
    app.get('/api/project/articles/id/:id', getArticleById);
    app.post('/api/project/articles/create', auth, createArticle);
    app.post('/api/project/articles/search/limit/:limit/skip/:skip', searchArticle);
    app.delete('/api/project/articles/:id', modifyPermission, deleteArticle);
    app.put('/api/project/articles/:id', modifyPermission, updateArticle);

    app.get('/api/project/comment/id/:id', getComment);
    app.get('/api/project/comment/author/:author/limit/:limit/skip/:skip', getCommentsByAuthor);
    app.get('/api/project/comment/article/:articleId', getCommentsByArticle);
    app.delete('/api/project/comment/id/:id', auth, deleteComment);
    app.post('/api/project/comment/:articleId/comment', auth, createComment);

     function getArticleByAuthor(req, res) {
        var author = req.params.author;

        articleModel.findArticleByAuthor(author, req.params.limit, req.params.skip)
            .then(
                function(response) {
                    res.json(response);
                },
                function(response) {
                    res.status(400).send(response);
                }
            )
    }


    
    function getAllArticle(req, res) {
        articleModel.findAll()
            .then(
                function(response) {
                    res.json(response);
                },
                function(response) {
                    res.status(400).send(response);
                }
            )
    }

    function getArticleById (req, res) {
        var id = req.params.id;
        articleModel.findById(id, req.params.limit, req.params.skip)
            .then(
                function(response) {
                    res.json(response);
                },
                function(response) {
                    res.status(400).send(response);
                }
            )
    }

    function createArticle(req, res) {
        articleModel.create(req.body)
            .then(
                function(response) {
                    res.json(response);
                },
                function(response) {
                    res.status(400).send(response);
                }
            )
    }

    function searchArticle(req, res) {
        var pattern = req.body;
        if (pattern.length > 0) {
            articleModel.getArticles(pattern, req.params.limit, req.params.skip)
                .then(
                    function(response) {
                        res.json(response);
                    },
                    function(response) {
                        res.status(400).send(response);
                    }
                )
        } else {
            articleModel.findAll(req.params.limit, req.params.skip)
                .then(
                    function(response) {
                        res.json(response);
                    },
                    function(response) {
                        res.status(400).send(response);
                    }
                )
        }

    }


    function deleteArticle(req, res) {
        var id = req.params.id;
        articleModel.delete(id)
            .then(
                function(response) {
                    commentModel.deleteByArticle(req.params.id)
                        .then(
                            function (response) {
                                res.json(response);
                            },
                            function (response) {
                                res.status(400).send(response);
                            }
                        )
                },
                function(response) {
                    res.status(400).send(response);
                }
            )

    }

    function updateArticle(req, res) {
        var id = req.params.id;
        var user = req.body;
        articleModel.update(id, user)
            .then(
                function(response) {
                    res.json(response);
                },
                function(response) {
                    res.status(400).send(response);
                }
            )
    }


    function getComment(req, res) {
        commentModel.findById(req.params.id)
            .then(
                function (data) {
                    res.json(data);
                }, function (response) {
                    res.status(400).send(response);
                }
            )
    }
    
    function getCommentsByArticle(req, res) {
        commentModel.findByArticle(req.params.articleId)
            .then(
                function (data) {
                    res.json(data);
                }, function (response) {
                    res.status(400).send(response);
                }
            )
    }
    function getCommentsByAuthor(req, res) {
        commentModel.findByAuthor(req.params.author, req.params.limit, req.params.skip)
            .then(
                function (data) {
                    res.json(data);
                }, function (response) {
                    res.status(400).send(response);
                }
            )
    }
    

    function deleteComment(req, res) {
        commentModel.delete(req,params.id)
            .then(
                function (response) {
                    res.status(200).send(response);
                }, function (response) {
                    res.status(400).send(response);
                }
            )
    }
    
    function createComment(req, res) {
        articleModel.findById(req.params.articleId)
            .then(
                function (article) {
                    commentModel.create(req.body)
                        .then(
                            function (comment) {
                                console.log(article);
                                article.commits.push(comment._id);
                                console.log(article.commits);
                                articleModel.update(req.params.articleId, article)
                                    .then(
                                        function (response) {
                                            res.send(response);
                                        },
                                        function (response) {
                                            res.status(400).send(response);
                                        }
                                    )
                            },
                            function (resoibse) {
                                res.status(400).send(response);
                            }
                        );
                },
                function (response) {
                    res.status(400).send(response);
                }
            )

    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function modifyPermission(req, res, next) {

        articleModel.findById(req.params.id)
            .then(
                function (response) {
                    var article = response;
                    if (req.isAuthenticated() && (req.user.username == article.author || req.user.roles.indexOf('admin') != -1)) {
                        next();
                    } else {
                        res.status(400).send(response);
                    }
                },
                function (response) {
                    res.status(400).send(response);
                }
            )
    }

};