const mongoose = require('mongoose')


const BalanceSchema = mongoose.Schema({
    ClientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", required: false, 
    },
    
    TransactionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
        required: false, 
    },
    
    Amount:{
            type: Number,
            required: true,
        }
})


module.exports = mongoose.model("Balance",BalanceSchema)