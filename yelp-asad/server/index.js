const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {register,login} =require('./controllers/UserController');
const {auth} = require('./auth');
const {loginValidator,registerValidator} = require('./validations.js');
const {createPost,getAllPosts} = require('./controllers/PostControllers.js');
const cors = require('cors');


app.get('/', (req,res) =>{
    res.send({
        message:"Hello World"
    })
})
app.use(cors());
app.use(express.json())


app.post('/auth/register',registerValidator,register);
app.post('/auth/login',login);

app.get('/posts',auth,getAllPosts);
app.post('/post',auth,createPost);


app.listen(4444, () => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/yelp?retryWrites=true&w=majority")
    .then(() => {
        console.log("DB Ok");
    }).catch((e) => {
        console.log(e);
    }) 
    console.log("http://localhost:4444");
    
})