const mongoose = require('mongoose')
const ProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName : {
        type : String ,
        required : false
    },
    lastName : {
        type :String,
        required :false
    },
    CIN : {
        type : String,
        required :true,
        unique:true
    },
    address : {
        type : String,
        required :true
    },
    phoneNumber :{
        type : String,
    }
})

module.exports = mongoose.model("Profile", ProfileSchema);
