var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

//PassportJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized : true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');

var connection_string = 'mongodb://localhost/cs5610';

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_URL +
        process.env.OPENSHIFT_APP_NAME;
} else {

}
mongoose.connect(connection_string);

var assignmentUserModel = require('./public/assignment/server/models/user.model.js')(app, mongoose);
var projectUserModel = require('./public/project/server/models/user.model.js')(app, mongoose);



var passport = require("./public/security")(app, assignmentUserModel, projectUserModel);


require("./public/assignment/server/app.js")(app, assignmentUserModel, mongoose, passport);
require("./public/project/server/app.js")(app, projectUserModel, mongoose, passport);

app.get('/', function(req, res){
    res.redirect("./public/index.html");
});

app.listen(port, ipaddress);

