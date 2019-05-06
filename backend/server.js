const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

var api = require('./routes/api.js');

app.use(cors());
app.use(bodyParser.json());

var mongoose = require('mongoose');
var mongooseURI = "";
var mongodb = mongoose.connect(mongoURI).connection;

mongodb.on('error', function(err){console.log(err.message);});
mongodb.once('open', function(){
    console.log("Connection established");
});

app.use('/api', api);

var port = process.env.port || 3030;

app.listen(port, function(){
    console.log("App is listening on port: " + port);
});
