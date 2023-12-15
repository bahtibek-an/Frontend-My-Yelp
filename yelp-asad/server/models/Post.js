const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        
        type:String,
        unique:true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
})

const postModel = mongoose.model('Post', postSchema);

module.exports = {
    postModel
}