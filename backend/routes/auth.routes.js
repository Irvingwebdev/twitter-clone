import express from "express"
import { login, logout, singup } from "../controllers/auth.controller.js"; //This function are previously registered on the controller file.

const router=express.Router() // Initializes an instance of an Express Router for handling application routes.

router.post("/signup", singup ) 

router.post("/login",login)

router.post("/logout",logout)

export default router; //Export router for can be used in other components