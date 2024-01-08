const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
    permissionName:{
        type:String,
        required:true
    }
});
// const PermissionsSchema = new mongoose.Schema({
//     permissionName:{
//         type:String,
//         required:true
//     }
// });

module.exports = mongoose.model('Permission', PermissionsSchema);
