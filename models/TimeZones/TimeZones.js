const mongoose = require('mongoose');

const TimeZonesSchema = mongoose.Schema({
    region: {
        type: String,
        required: true,
    },
    timeZone: {
        type: String,
        required: true,
    },
    // },
    // timeZone: {
    //     type: String,
    //     required: true,
    // },
});

module.exports = mongoose.model('TimeZone', TimeZonesSchema);
