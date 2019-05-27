// Include all dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');



// Initiate app functions
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
var routes = require('./routes/api.js');

app.use('/api', routes);


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@andromeda-beta-1mxzv.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test_data").collection("andromeda_beta");
//   // perform actions on the collection object
// //   client.close();
// });
var mongooseURI = "mongodb+srv://admin:<PWD>@andromeda-beta-1mxzv.mongodb.net/test"
// *, {useNewUrlParser: true, dbName: 'test_data'}*/
mongoose.connect(uri, {useNewUrlParser: true, dbName: 'test_data'}, function(error){
    if (error){
        console.log("Errrrrorrrrr reeeeeeeeeee")
        console.log(error);
        throw error
    } console.log("Connection established")
});
//     .then( () =>{
//         console.log("Connection to Mongo Successful")
//     }).catch( (err) => console.log(err));

// mongodb.on('error', function(err){console.log(err.message);});
// mongodb.once('open', function(){
//     console.log("Connection established");
// });

// mongodb.MongoClient.connect(process.env.MONGODB_URI || mongooseURI, function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

//   db = client.db();
//   console.log("Database connection ready");


// });

var port = process.env.port || 3030;
    app.listen(port, function(){
    console.log("App is listening on port: " + port);
    });


// // Include database and initialize
// ;
// const connection = mongoose.connect(mongooseURI, { useNewUrlParser: true }).connection;


// // mongodb.on('error', function(err){console.log(err.message);});
// connection.once('openUri', function(){
//     console.log("Connection established");
// });


// Run application 


