const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
    restaurantName:String,
    restaurantImage:String,
    restaurantDesc:String
})
const Post = mongoose.model('Post', postsSchema)

module.exports = {
    Post
}