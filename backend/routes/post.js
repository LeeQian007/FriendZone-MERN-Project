import express from "express";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
//   /post/xxxx
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/profile", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePosts);

export default router;
