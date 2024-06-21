import { Router } from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts } from '../controllers/post.controller.js';


const router=Router();

router.delete("/:id", protectRoute , deletePost)
router.get("/likes/:id", protectRoute , getLikedPosts)
router.get("/all", protectRoute , getAllPosts)
router.get("/following", protectRoute , getFollowingPosts)
router.get("/user/:username", protectRoute , getUserPosts)
router.post("/comment/:id", protectRoute , commentOnPost)
router.post("/create", protectRoute , createPost)
router.post("/like/:id", protectRoute , likeUnlikePost)


export default router;
