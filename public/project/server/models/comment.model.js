/**
 * Created by guhan on 4/22/16.
 */
module.exports = function(app, mongoose) {


    var commentModel = {};
    var commentSchema = require("./commemt.schema.server.js")(mongoose);
    var comments = mongoose.model("comments", commentSchema);

    commentModel.findById = function (id) {
        return comments.find({_id : id});
    };

    commentModel.findByArticle = function (articleId) {
        return comments.find({article : articleId});
    }

    commentModel.findByAuthor = function (author, limit, skip) {
        return comments.find({author : author}).limit(Number(limit)).skip(Number(skip))
    }

    commentModel.create = function (comment) {
        return comments.create(comment);
    };

    commentModel.delete = function (id) {
        return comments.remove({_id : id});
    };

    commentModel.deleteByArticle = function(articleId) {
        return comments.remove({article : articleId});
    }

    return commentModel;

};