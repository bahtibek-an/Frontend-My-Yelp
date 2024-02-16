const {User} = require('./models/User')
const {Post} = require('./models/Restaraunt')
const {Login} = require('./models/Login')

const root = {
    getAllUsers: async () => {
        try{
            const users = await User.find();
            return users;
        }catch(error){  
            console.log(error);
        }
    },
    getAllPosts: async () => {
        try{
            const posts = await User.find();
            return posts;
        }catch(error){
            console.log(error);
        }
    },
    addUser: async ({ user }) => {
        try {
            const userEmail = await User.findOne({email: user.email})
            const userName = await User.findOne({name: user.name})
            const userPassword = await User.findOne({name: user.password})
            if(userEmail){
                return {success:false, message:'Email arleady used!'}
            }
            if(userEmail  === ""){
                return {success:false, message:"Please enter E-mail"}
            }
            if(userName === ""){
                return {success:false, message:"Please enter Name"}
            }
            if(userName){
                return {success:false, message:'Name arleady used!'}
            }
            if(userPassword === ""){
                return {success:false, message:'Please valid your password'}
            }
            await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
            });

            return {success:true, message:"Succes registered"}
        } catch (err) {
            console.error(err);
            return false;
        }
    },  
    login: async ({ data }) => {
        try {
            const user = await User.findOne({ email: data.email });

            if (!user) {
                return { success: false, message: 'User not found' };
            }

            if (user.password !== data.password) {
                return { success: false, message: 'Incorrect password' };
            }

            return { success: true, message: 'Login successful', token: 'yourAuthTokenHere', data:User.findOne(data) };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'An error occurred' };
        }
    },
    addPost: async ({ userID,post }) => {
        console.log({userID});
        try {
          const user = await User.findOne({_id:userID });
          if (!user) {
            console.error('User not found!');
            return null;
          }
      
          const newPost = {
            restaurantName: post.restaurantName,
            restaurantImage: post.restaurantImage,
            restaurantDesc: post.restaurantDesc,
          };
      
          user.posts.push(newPost);
      
          await user.save();
      
          console.log('Succes adding new post', user);
          
          return user;
        } catch (error) {
          console.error(error   );
          throw new Error('Error in adding post');
        }
      },

    deleteUser:async ({id}) =>{
        try{
            const res = await User.deleteOne({_id:id})
            if(!res){
                console.log("User not found");
                return false
            }
            return res.deletedCount === 1
            // return true
        }catch(error){
            console.log('Error',error);
            return false
        }
    },
    deletePost:async ({id}) => {
        try{
            const userPosts = await User.findOne({_id:id})
            if(!userPosts){
                console.log("Post not found!");
            }

            userPosts.posts.delete({_id:id})
            await userPosts.save();
            return true
        }catch(error){
            console.log(error);
            return false
        }
    }
};

module.exports ={
    root
}