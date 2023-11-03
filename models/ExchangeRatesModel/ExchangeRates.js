const mongoose = require('mongoose');
const ExchangeRatesSchema = new mongoose.Schema({
    departureCountry : {
        type: String,
        required: true,
    },
    arrivalCountry : {
        type: String,
        required: true,
    },
    departureDevise : {
        type: String,
        required : true
    },
    arrivalDevise : {
        type: String,
        required :true
    },
    exchangeRates : {
        type: Number,
        required : true
    }
})
module.exports = mongoose.model("ExchangeRates", ExchangeRatesSchema)