const mongoose = require('mongoose');

const CurrencySchema = mongoose.Schema({
    CurrencyName: {
        type: String,
        required: true,
    },
    CurrencySymbol: {
        type: String,
        required: true,
    },
    CurrencyCode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Currency', CurrencySchema);
