/**
 * Created by guhan on 4/22/16.
 */
module.exports = function(mongoose) {
    var CommitSchema = new mongoose.Schema({
        author: String,
        article: mongoose.Schema.Types.ObjectId,
        date : {type: Date, default: Date.now },
        body : String,
    }, {collection: "commit"});
    return CommitSchema;
}