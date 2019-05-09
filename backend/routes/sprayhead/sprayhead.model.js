var mongoose = require('mongoose');
var schema = mognoose.Schema();

var SprayHeadSchema = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    location:{
        latitude: String,
        longitude: String
    },
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