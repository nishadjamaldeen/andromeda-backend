const boom = require('boom');
const mongoose = require('mongoose');

var Sprayhead = require('../models/sprayhead.js');

var ObjectId = mongoose.Types.ObjectId;

module.exports.getSprayheads = function(req, res){
    // console.log("error here");
    Sprayhead.find({}, function(err, results){
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
};

module.exports.getByNodeID = function(req, res){
    // Sprayhead.find({"node_id": {$eq : req.params.nodeid}}, function(err, sprayhead){
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).send(err);
    //     }
    //     // console.log(sprayhead);
    //     return res.json(sprayhead);
    // })
    Sprayhead.find({node_id: req.params.id}, function(err, sprayhead){
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        console.log(sprayhead);
        return res.json(sprayhead);
    })
}

module.exports.getById = function(req, res){
    try{
        var spray = Sprayhead.findById(ObjectId(req.params.id)).exec();
        res.json(spray);
    } catch (error){
        res.status(500).send(error);
    }
}

module.exports.getByLat = function(req, res){
    Sprayhead.find({"latitude": {$eq: req.params.lat}}, function(err, sprayhead){
        if (err) return res.status(500).send(err);
        return res.json(sprayhead);
    })
}

module.exports.add = function(req, res){

    let device = new Sprayhead({
        "latitude": req.body.lat,
        "longitude": req.body.long,
        "node_id": req.body.nodeid
    });

    device.save(function (error){
        if (error) return next(error);
        res.send("Added successfully");
    });
}
