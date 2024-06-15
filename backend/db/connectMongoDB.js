import mongoose from "mongoose";

const connectMongoDB = async () => { // Connection to the database with an asynchronous function
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Wait for the connection to be established
        console.log(`MongoDB connected: ${conn.connection.host}`);  // Print a message if the connection is established successfully
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`); // If the connection is not established, show an error message
        process.exit(1); // Terminate the process with an error
    }
}

export default connectMongoDB;
