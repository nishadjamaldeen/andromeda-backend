// Include all dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const morgan = require('morgan');


// Initiate app functions
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('combined'));


var routes = require('./routes/api.js');

app.use('/api', routes);
app.use('/', function(req, res){
    return res.send("Andromeda Backend Server v4");
})

const MongoClient = require('mongodb').MongoClient;
const uri = "";

mongoose.connect(uri, {useNewUrlParser: true, dbName: 'test_data'}, function(error){
    if (error){
        console.log(error);
        throw error
    } console.log("Connection established")
});

var port = process.env.PORT || 3000;
    app.listen(port, function(){
    console.log("App is listening on port: " + port);
    });
