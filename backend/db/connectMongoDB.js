import mongoose from "mongoose";


const connectMongoDB = async () =>{ //Conection to the db with a asynchronous function
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)  //Await for the connection
        console.log(`MongoDB connected: ${conn.connection.host}`)   //Print a message if the connection is established
        
    } catch (error) {
        console.error(`Error connection to MongoDB: ${error.message}`); //If the connection is not established show a message.
        process.exit(1);
    }
}

export default connectMongoDB;