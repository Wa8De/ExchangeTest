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
        required : true
    },
    city : {
        type: String,
        required :true
    }
})
module.exports = mongoose.model("Devise", DeviseSchema)