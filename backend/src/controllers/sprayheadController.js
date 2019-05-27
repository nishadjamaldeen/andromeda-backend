const boom = require('boom');
const mongoose = require('mongoose');

const sprayhead = require('../models/sprayhead.js');
var ObjectId = mongoose.Types.ObjectId;

module.exports.getSprayheads = function(req, res){
    console.log("error here");
    sprayhead.find({}, function(err, results){
        if (err){    
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
};

module.exports.getById = function(req, res){
    console.log("Here");
    sprayhead.findById(ObjectId(req.params.id), function(err, result){
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
}

module.exports.getByLat = function(req, res){

    try{
        var spray = sprayhead.find({"lat":req.params.lat}).exec();
        res.send(spray);
    } catch(error){
        res.status(500).send(error)
    }
    // sprayhead.find({"lat":req.params.lat}, function(err, spray){
    //     if (err){
    //         console.log(err);
    //         return res.status(500).send(err);
    //     } return res.json(spray);
    // })
}

module.exports.add = function(req, res){
    console.log("Request received")
    let device = new sprayhead(
        {
            latitude: req.body.lat,
            longitude: req.body.long,
            imei: req.body.imei
        }
    );

    device.save(function (error){
        if (error) return next(error);
        res.send("Added successfully");
    })
    // try{
    //     var device = new sprayhead(req.body);
    //     var result = device.save();
    //     res.send(result);
    // } catch(error){
    //     res.status(500).send(error);
    // }

    // if(!req.body.imei) {
    //     return res.status(400).send({
    //         message: "Devices requires IMEI"
    //     });
    // }
    
    // var device = new sprayhead({
    //     latitude: req.body.lat,
    //     longitude: req.body.long,
    //     imei: req.body.imei
    // });

    // device.save()
    // .then(data => {
    //     res.send(data);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Error in adding new device"
    //     });
    // });
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
