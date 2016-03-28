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

var userModel = require("./public/assignment/server/models/user.model.js")(app);
require("./public/assignment/server/services/user.service.server.js")(app, userModel);

var formModel = require("./public/assignment/server/models/form.model.js")(app);
require("./public/assignment/server/services/form.service.js")(app, formModel);
require("./public/assignment/server/services/field.service.server.js")(app, formModel);

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);

