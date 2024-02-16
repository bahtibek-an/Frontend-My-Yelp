const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql')
const {root } = require('./roots')
app.use(cors())


const graphqlSchema = buildSchema(`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        posts: [Posts!]!
    }
    input userInput {
        name: String!
        email: String!
        password: String!
    }
    type Posts {
        id: ID!
        restaurantName: String!
        restaurantImage: String!
        restaurantDesc: String!
    }
    input PostInput {
        restaurantName: String!
        restaurantImage: String!
        restaurantDesc: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }

    type AuthResponse {
        success: Boolean!
        message: String!
        token: String
        data:User!
    }

    type Mutation {
        addPost(userID:ID! post: PostInput!): User
        addUser(user: userInput!): AuthResponse!
        login(data: LoginInput!): AuthResponse!
        deleteUser(id:ID!):Boolean!
        deletePost(id:ID!):Boolean!
    }

    type Query {
        getAllPosts: [User]!
        getAllUsers: [User]!
    }
`)


app.get("/delete-null-books", async (req, res) => {
    try {
      const result = await User.deleteMany({ user: null });
      res.json({ deletedCount: result.deletedCount });
    } catch (error) {   
      res.status(500).json({ error: "An error occurred" });
    }
  });


app.use('/graphql', graphqlHTTP ({
    schema: graphqlSchema,
    rootValue: root,
    graphiql: true
}));




app.listen(4000, () => {
    mongoose.connect("mongodb+srv://akbaralievbehruz44:user@cluster0.6tpnz02.mongodb.net/yelpMain?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Mongo DB conected!");
    }).catch((err) => {
        console.log("Error in conect", err);
    })
    console.log("Runin graphql server at http://localhost:4000/graphql");

})