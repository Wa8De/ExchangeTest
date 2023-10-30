const mongoose = require('mongoose')


const RolesSchema = new mongoose.Schema({
    roleName :{
        type:String,
        required:true
    },
})
module.exports = mongoose.model('Role', RolesSchema)