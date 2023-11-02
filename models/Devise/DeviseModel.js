const mongoose = require('mongoose');
const DeviseSchema = new mongoose.Schema({
    devise : {
        type: String,
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    country : {
        type: String,
        require : true
    },
    city : {
        type: String,
        require :true
    }
})
module.exports = mongoose.model("Devise", DeviseSchema)