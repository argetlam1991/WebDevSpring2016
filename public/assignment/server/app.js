/**
 * Created by guhan on 4/26/16.
 */
module.exports = function(app, userModel, mongoose, passport) {
    require("./services/user.service.server.js")(app, userModel, passport);
    
    var formModel = require("./models/form.model.js")(app, mongoose);
    var fieldModel = require("./models/field.model.js")(app, mongoose, formModel);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.server.js")(app, fieldModel);
}