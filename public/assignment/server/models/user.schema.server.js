/**
 * Created by guhan on 4/5/16.
 */

module.exports = function(mongoose) {

    var UserSchema = new mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
    }, {collection: "user"});
    
    return UserSchema;
    
}
