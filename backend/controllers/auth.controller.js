//Defined the safe route functions and showing a message in the json format
import { generateTokenAndSetCookie } from "../lib/util/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//-------------------------------- Start Signup function ----------------------
export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body; // Destructure req.body to extract specific fields (fullname, username, email, password)

    const emailRegex = /^[a-z][a-z0-9]*@gmail\.com$/; //Validate email address in this format

    if (!emailRegex.test(email)) {
      //If the email is not valid based on the email regex
      return res.status(400).json({
        //The code 4000 is used when the email is invalid
        error: "Email is not valid",
      });
    }

    const existingUser = await User.findOne({ username }); //Search for existing user taking precedence over the current user name and comparison with the User object
    if (existingUser) {
      //If the user already exists
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const existingEmail = await User.findOne({ email }); //Finding the user in the database
    if (existingEmail) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10); //Generate a salt for make sure password
    const hashedPassword = await bcrypt.hash(password, salt); //Using the salt and applying in the password hash before saving in to database

    //Create new user with the User object/model
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword, //Save the hashed password
    });

    //If the user already exists in the database, then generate a coockie, send a status 201 to confirm the creation of the new user, and send their information.
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
        bio: newUser.bio,
        link: newUser.link,
      });
    }
  } catch (error) {
    console.log("Error in sign up controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//-------------------------------- End Signup function ----------------------

//-------------------------------- Start Login function ----------------------
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordsCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordsCorrect) {
      return res.status(400).json({
        error: "Invalid username or password",
      });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
      bio: user.bio,
      link: user.link,
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//-------------------------------- End Login function ----------------------

//-------------------------------- Start Logout function ----------------------
export const logout = async (req, res) => {
  try {
    // res.clearCookie("jwt");
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//-------------------------------- End Logout function ----------------------

export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error in getMe controller", error.message);
      res.status(500).json({ error: error.message }); // Return a error if something went wrong
    }
  };
  
  

