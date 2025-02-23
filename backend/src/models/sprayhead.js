

const mongoose = require('mongoose');

var SprayHeadSchema = new mongoose.Schema({
    latitude: { type: String },
    longitude: { type: String },
    state: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    node_id: { type: String }
});

module.exports = mongoose.model('Sprayhead', SprayHeadSchema);
