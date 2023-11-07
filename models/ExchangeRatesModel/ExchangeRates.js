const mongoose = require('mongoose');
const ExchangeRatesSchema = new mongoose.Schema({
    departureDevise : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Devise"
    },
    arrivalDevise : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Devise"
    },
    exchangeRates : {
        type: Number,
        required : true
    }
})
module.exports = mongoose.model("ExchangeRates", ExchangeRatesSchema)