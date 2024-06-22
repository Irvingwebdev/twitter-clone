import path from "path";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
dotenv.config(); //Initialize environment
const app = express(); //Initialize express how a const
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
console.log(process.env.MONGO_URI); //Show the environment variable

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); //Initialize cloudinary

app.use(express.json({ limit: "5mb" })); // Parse JSON-encoded bodies(req.body) to JavaScript objects
app.use(express.urlencoded({ extended: true })); //To parse form data(urlencoded)
app.use(cookieParser()); //  Parses cookies from express server and returns express object with cookie values.
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes); //If one users try to access at the route /api/users is redirected to userRoutes.

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  //This is for turn on the server
  console.log(`Server is running on port port ${PORT}`); //This show a message when the connection is established
  connectMongoDB(); //This is for connect to the database
});
