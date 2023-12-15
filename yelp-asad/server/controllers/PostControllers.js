const mongoose = require('mongoose');
const {postModel} = require('../models/Post');

const createPost = async (req,res) => {
    try {
        const doc = new postModel({
            title:req.body.title,
            user:req.userId
        })
        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(503).json(({
            message:"Error in create post!"
        }))
    }
}


//ok
const getAllPosts = async (req,res) => {
    try {
        const posts = await postModel.find().populate('user').exec();

        if(posts.length === 0){
            return res.status(404).json({
                message:"Posts not found!"
            })
        }

        res.json(posts)
    } catch (error) {
        console.log(error);
        return res.status(503).json({
            message:"Internal server erorr!"
        })
    }
}

module.exports = {
    createPost,
    getAllPosts
}