const boom = require('boom');
const mongoose = require('mongoose');

var Command = require('../models/command.js');

var ObjectId = mongoose.Types.ObjectId;

// GET available commands
module.exports.getCommands = function(req, res){
    Command.find({}, function(err, results){
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
};

// GET staged commands (ie. not yet downloaded by hub)
module.exports.getLatest = function(req, res){
    Command.find({downloaded: false}, function(err, results){
        if (err){
            console.log(err);
            return res.status(500).send(err);
        }
        return res.json(results);
    });
};



module.exports.update = function(req, res){
    Command.update({"command_id": req.body.command_id},{$set: {"uploaded": req.body.uploaded}},
      function(err,result) {
        if (err) {
          console.log(err);
        }
      }
    );
}

// ADD commands to table
// Handles the request once received at database
module.exports.add = function(req, res){
    let command = new Command({
        "type": req.body.type,
        "scheduledFor": req.body.scheduledFor,
        "target_id": req.body.target_id,
        "command_id": req.body.command_id,
        "downloaded": req.body.downloaded
    });

    command.save(function (error){
        if (error) return next(error);
        res.send("Added successfully");
    });
}
