import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js"; //This function are previously registered on the controller file.
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router(); // Initializes an instance of an Express Router for handling application routes.

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);


export default router; //Export router for can be used in other components
