const mongoose = require('mongoose');

var SprayHeadSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
    state: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    imei: String

});

module.exports = mongoose.model('Sprayhead', SprayHeadSchema);