import express from "express";
import { getUser, getUserFrinds, addRemoveFrind } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// /user/xxx
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFrinds);

router.patch("/:id/:friendId", verifyToken, addRemoveFrind);

export default router;
