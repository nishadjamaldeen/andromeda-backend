const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var api = require('./routes/api.js');

app.use(cors());
app.use(bodyParser.json());


var mongooseURI = "mongodb+srv://admin:admin@andromeda-test-may-dhacq.mongodb.net/test?retryWrites=true";
mongoose.connect(mongooseURI, { useNewUrlParser: true });
const connection = mongoose.connection;

// mongodb.on('error', function(err){console.log(err.message);});
connection.once('open', function(){
    console.log("Connection established");
});


var port = process.env.port || 3030;

app.listen(port, function(){
    console.log("App is listening on port: " + port);
});
