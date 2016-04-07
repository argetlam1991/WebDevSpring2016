/**
 * Created by guhan on 4/6/16.
 */
module.exports = function(mongoose) {

    var FieldSchema = new mongoose.Schema({
        label : String,
        type : {type : String, default : "TEXT",
                enum : ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD",
                        "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]},
        placeholder : String,
        options : [{label : String, value:String}]
    }, {collection: "field"});

    return FieldSchema;

}