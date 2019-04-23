var express = require('express');    //Express Web Server 
var app = express();
var router = express.Router();
var busboy = require('connect-busboy'); //middleware for form/file upload
app.use(busboy());
var path = require('path');     //used for file path
var fs = require('fs');       //File System - for file manipulation
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'files')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3030, function() {
    console.log('Listening on port 8080');
});
require('./controller/img.controller')(router);