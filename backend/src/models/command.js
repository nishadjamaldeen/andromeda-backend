

const mongoose = require('mongoose');

var CommandSchema = new mongoose.Schema({
    type: { type: String }, // Type of command (ex. START and STOP)
    scheduledFor: { type: String }, // Time to transmit
    created: { type: Date, default: Date.now },
    target_id: { type: String },
    command_id: { type: String },
    downloaded: { type: Boolean }, // Whether the command has been downloaded to hub
    test: {type: String}
});

module.exports = mongoose.model('Command', CommandSchema);
