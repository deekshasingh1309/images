var express = require('express');    //Express Web Server 
var app = express();
var mongoose = require('mongoose');
var busboy = require('connect-busboy'); //middleware for form/file upload
var routes = require('./routes/img.routes');

app.use(busboy());

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static(__dirname));

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/imageapp', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/', routes)

app.listen(8080, function() {
    console.log('Listening on port 8080');
});
