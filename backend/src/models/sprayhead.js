const mongoose = require('mongoose');

var SprayHeadSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     required: true
    // },
    latitude: Number,
    longitude: Number,
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