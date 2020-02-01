

const mongoose = require('mongoose');

var CommandSchema = new mongoose.Schema({
    type: { type: String }, // Type of command (ex. START and STOP)
    scheduledFor: { type: String }, // Time to transmit
    created: { type: Date, default: Date.now },
    target_id: { type: String },
    command_id: { type: String },
    uploaded: { type: Boolean } // Whether the command has been uploaded
});

module.exports = mongoose.model('Command', CommandSchema);
