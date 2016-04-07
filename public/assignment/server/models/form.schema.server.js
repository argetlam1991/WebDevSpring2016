/**
 * Created by guhan on 4/6/16.
 */

module.exports = function(mongoose, FieldSchema) {

    var UserSchema = new mongoose.Schema({
        userId : String,
        title : {type : String, default : "New Form"},
        fields : [FieldSchema],
        created : {type : Date, default : Date.now},
        updated : {type : Date, default : Date.now}
    }, {collection: "form"});

    return UserSchema;

}