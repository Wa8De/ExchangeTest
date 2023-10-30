const mongoose = require('mongoose')


const transactionsTypesSchema = mongoose.Schema({    
    NameCategory:{
        type:String,
        required:true
    },
    DescriptionCategory:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("transactionsCategory",transactionsTypesSchema)