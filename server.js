var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer')
var app = express();
app.use(express.static(__dirname + '/public/assignment'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');

var connection_string = 'mongodb://localhost/cs5610';

if (process.env.OPENSHIFT_MONGODB_URL) {
    connection_string = process.env.OPENSHIFT_MONGODB_URL +
        process.env.OPENSHIFT_APP_NAME;
}
console.log(connection_string);
mongoose.connect(connection_string);

var userModel = require("./public/assignment/server/models/user.model.js")(app, mongoose);
require("./public/assignment/server/services/user.service.server.js")(app, userModel);

var formModel = require("./public/assignment/server/models/form.model.js")(app, mongoose);
var fieldModel = require("./public/assignment/server/models/field.model.js")(app, mongoose, formModel);
require("./public/assignment/server/services/form.service.js")(app, formModel);
require("./public/assignment/server/services/field.service.server.js")(app, fieldModel);

app.get('/', function(req, res){
    res.redirect("/client/index.html");
});

app.listen(port, ipaddress);

