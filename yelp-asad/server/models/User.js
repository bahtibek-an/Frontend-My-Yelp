const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        unique:true
    }
    
})
const userModel = mongoose.model('User',userSchema);

module.exports = {
    userModel
}