var express = require('express');
var controller = require('./bucket.controller.js');

var router = express.Router();

router.get('/', function(req, res){
    return res.status(200).send("Successful!");
});