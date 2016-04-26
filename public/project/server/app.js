/**
 * Created by guhan on 4/26/16.
 */
module.exports = function(app, userModel, mongoose, passport) {
    require("./services/user.service.server.js")(app, userModel, passport);
    var articleModel = require("./models/article.model.js")(app, mongoose);
    var commentModel = require("./models/comment.model.js")(app, mongoose);
    require("./services/article.service.server.js")(app, userModel, articleModel, commentModel, passport);
}