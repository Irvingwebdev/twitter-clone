import mongoose from "mongoose";

const userSchema=new mongoose.Schema({  //Schema object for the users table.
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId, //Get the follower id (154548415)
            ref:"User", //Reference to the "user" model
            default:[]  //Default value is empty array
        },
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId, //Get the follower id (154548415)
            ref:"User", //Reference to the "user" model
            default:[]  //Default value is empty array
        },
    ],
    profileImg:{
        type:String,
        default:"",
    },
    coverImg:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
    },
    link:{
        type:String,
        default:"",
    },
    likedPosts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
            default:[]
        },
    ],


},{timestamps:true}) //Get the current timestamp for the current user

const User=mongoose.model("User" , userSchema);
export default User;



