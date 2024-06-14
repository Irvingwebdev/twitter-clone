import express from "express"
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
dotenv.config() //Initialize environment

const app=express(); //Initialize express how a const

console.log(process.env.MONGO_URI) //Show the environment variable

app.use("/api/auth", authRoutes) //If one users try to access at the route /api/auth is redirected to authRoutes or in other word, redirect to the safe route

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{   //This is for turn on the server
    console.log(`Server is running on port port ${PORT}`) //This show a message when the connection is established
    connectMongoDB() //This is for connect to the database
})