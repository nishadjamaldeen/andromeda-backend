const boom = require('boom');
const mongoose = require('mongoose');

const sprayhead = require('../models/sprayhead.js');

module.exports.getSprayheads = function(req, res){
    sprayhead.find({}, function(err, results){
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
};

module.exports.getById = function(req, res){

    sprayhead.find({"_id": req.params.id}, function(err, result){
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
}

module.exports.add = function(req, res){
    console.log("Request received")

    // if(!req.body.imei) {
    //     return res.status(400).send({
    //         message: "Devices requires IMEI"
    //     });
    // }
    
    var device = new sprayhead({
        latitude: req.body.lat,
        longitude: req.body.long,
        imei: req.body.imei
    });
    console.log ("saving...");

    device.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in adding new device"
        });
    });

    console.log("saved");
}

// async (req, res) => {
//     try{
//         const sprayheads = await sprayhead.find()
//         return cards;
//     }catch (err){
//         console.log(err);
//         return res.status(500).send(err);
//     }
// }
