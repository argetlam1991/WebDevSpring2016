/**
 * Created by guhan on 4/11/16.
 */
module.exports = function(mongoose) {
    var ArticleSchema = new mongoose.Schema({
        author: String,
        date : {type: Date, default: Date.now },
        title: String,
        body : String,
        commits : [mongoose.Schema.Types.ObjectId],
        topics: [String]
    }, {collection: "article"});
    return ArticleSchema;
}