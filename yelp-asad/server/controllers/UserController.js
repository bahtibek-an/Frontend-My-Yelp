const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {userModel} = require('../models/User.js');

const register = async(req,res) => {
    try {

        const password = req.body.password
        const salt     = await bcrypt.genSalt(10)
        const hash     = await bcrypt.hash(password,salt)


        const doc = new userModel({
            name:req.body.name,
            email:req.body.email,
            passwordHash:hash
        })
        const user = await doc.save();

        const token = jwt.sign(
            {
            _id:user._id
           
            },
        'secret123',
        {
            expiresIn:'30d'
        }
        )

        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(503).json(({
            message:"Error in Sign Up!"
        }))
    }
}


const login = async(req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({
                message:"User not found!"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
            return res.status(404).json({
                message:"Incorect login or password"
            })   
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        );
        const {passwordHash,...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        res.status(503).json(({
            message:"Error in Sign in!"
        }))
        console.log(error);
    }
}

module.exports = {
    register,
    login
}