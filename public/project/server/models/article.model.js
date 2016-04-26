/**
 * Created by guhan on 4/11/16.
 */
module.exports = function(app, mongoose) {


    var articleModel = {};
    var articleSchema = require("./article.schema.server.js")(mongoose);
    var articles = mongoose.model("article", articleSchema);
    

    articleModel.findArticleByAuthor = function (authorName, limit, skip) {
        return articles.find({'author' : authorName}).limit(Number(limit)).skip(Number(skip));
    };

    articleModel.findById = function (id) {
        return articles.findOne({'_id' : id});
    };

    articleModel.getArticles = function (filter, limit, skip) {
        var pattern = [];
        for(var i = 0; i < filter.length; i++) {
            pattern.push({author : filter[i]});
            pattern.push({title : filter[i]});
            pattern.push({topics : filter[i]});
        }
        return articles.find( {$or : pattern}).limit(Number(limit)).skip(Number(skip));

    }

    articleModel.findAll = function (limit, skip) {
        return articles.find().limit(Number(limit)).skip(Number(skip));
    };

    articleModel.create = function (article) {
        return articles.create(article);
    };

    articleModel.update = function (articleId, article) {
        delete article._id;
        return articles.update({_id : articleId}, article);
    }

    articleModel.delete = function (id) {
        return articles.remove({_id : id});
    };

    return articleModel;

};