/**
 * Created by guhan on 4/5/16.
 */

module.exports = function(mongoose) {

    var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        type : {type: String, default: 'project'},
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        topics: [String],
        roles: [String]
    }, {collection: "projectUser"});
    return UserSchema;
}
