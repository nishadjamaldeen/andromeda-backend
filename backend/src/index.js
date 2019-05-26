// Include all dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')



// Initiate app functions
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
var routes = require('./routes/index.js');

app.use('/api', routes);



// Include database and initialize
var mongooseURI = "mongodb+srv://admin:admin@andromeda-test-may-dhacq.mongodb.net/test?retryWrites=true";
mongoose.connect(mongooseURI, { useNewUrlParser: true });
const connection = mongoose.connection;

// mongodb.on('error', function(err){console.log(err.message);});
connection.once('open', function(){
    console.log("Connection established");
});


// Run application 
var port = process.env.port || 3030;
app.listen(port, function(){
    console.log("App is listening on port: " + port);
});

