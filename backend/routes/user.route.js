import express from 'express';
import { Router } from 'express';
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } from '../controllers/user.controlles.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=Router();

router.get("/profile/:username", protectRoute ,getUserProfile) 
router.get("/suggested", protectRoute ,getSuggestedUsers)
router.post("/follow/:id", protectRoute ,followUnfollowUser)
router.post("/update", protectRoute ,updateUser)

export default router;