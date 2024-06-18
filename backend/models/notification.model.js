import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["like","follow"]
    },
    read:{
        type:Boolean,
        default:false
    },
    
},{ timestamps:true})


const Notification=mongoose.model("Notifications", notificationsSchema)
export default Notification;